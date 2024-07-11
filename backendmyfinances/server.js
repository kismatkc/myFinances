import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import mongoose from "mongoose";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

//routes
import accountRoutes from "./routes/account-routes.js"
dotenv.config();
const app = express();
if (!process.env.DATABASE_URL) {
  throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.DATABASE_URL)
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        throw new Error('MongoDB connection error');
      });
    cached.conn = cached.promise;
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
const port = process.env.PORT || 4200;

app.use(cors());

// app.use(ClerkExpressRequireAuth());
app.use(express.json());

app.use("/api",accountRoutes);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
