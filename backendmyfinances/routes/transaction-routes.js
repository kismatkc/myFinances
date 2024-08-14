import express from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction
} from "../controllers/transaction-controller.js";

const router = express.Router();

router.get("/transactions", getTransactions);
router.post("/transaction/create", createTransaction);
router.post("/transaction/delete", deleteTransaction);
router.patch("/transaction/update",updateTransaction)

export default router;
