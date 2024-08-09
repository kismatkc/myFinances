import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const TransactionSchema = new Schema(
  {
    transactionId: {
      type: string,
      default: uuidv4,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payee: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },

    accountId: {
      type: Schema.types.ObjectId,
      ref: "Account",
      required: true,
    },
    categoryId: {
      type: Schema.types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
