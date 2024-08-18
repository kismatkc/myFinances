
import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const TransactionSchema = new Schema(
  {
    transactionId: {
      type: String,
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
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: String,
      required: true
    },
   
  },
  {
    timestamps: true,
    unique: true
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
