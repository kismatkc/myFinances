import express from "express"
import { createUser, deleteUser, getUser } from "../controllers/account-controller.js";

 const router = express.Router();

router.get("/account",getUser);
router.post("/account",createUser)
router.delete("/account",deleteUser)

export default router;