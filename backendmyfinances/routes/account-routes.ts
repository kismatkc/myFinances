import express from "express"
import { createUser } from "../controllers/account-controller";

 const router = express.Router();

router.get("/account",createUser);

export default router;