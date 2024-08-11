import express from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "../controllers/transaction-controller.js";

const router = express.Router();

router.get("/transactions", getTransactions);
router.post("/transaction/create", createTransaction);
router.post("/transaction/delete", deleteTransaction);
// router.patch("/name/update",updateUser)

export default router;
