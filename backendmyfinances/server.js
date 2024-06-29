import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
dotenv.config();
const app = express();
const port = process.env.PORT || 4200;

app.use(cors());


app.use(ClerkExpressRequireAuth());

app.get("/api", (req, res) => {
  res.send("Hello from /api rout");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
