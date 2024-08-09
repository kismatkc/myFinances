import express from "express";
import {
  getTransactions,
  createTransaction,
} from "../controllers/account-category-controller.js";

const router = express.Router();

router.get("/transaction", getTransactions);
router.post("/transaction/create", createTransaction);
// router.post("/name/delete",deleteUser)
// router.patch("/name/update",updateUser)

export default router;
