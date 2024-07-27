import express from "express"
import { createUser, deleteUser, getUser ,updateUser} from "../controllers/account-controller.js";

 const router = express.Router();

router.get("/account",getUser);
router.post("/account",createUser)
router.post("/account/delete",deleteUser)
router.patch("/account/update",updateUser)
export default router;