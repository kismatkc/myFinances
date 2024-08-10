import express from "express";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transaction-controller.js";

const router = express.Router();

router.get("/transactions", getTransactions);
router.post("/transaction/create", createTransaction);
// router.post("/name/delete",deleteUser)
// router.patch("/name/update",updateUser)

export default router;
