import express from "express"
import { createUser, getUser } from "../controllers/account-controller.js";

 const router = express.Router();

router.get("/account",getUser);
router.post("/account",createUser)

export default router;