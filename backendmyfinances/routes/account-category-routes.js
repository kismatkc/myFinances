import express from "express"
import { createUser, deleteUser, getUser ,updateUser} from "../controllers/account-category-controller.js";

 const router = express.Router();

//account
router.get("/name",getUser);
router.post("/name/create",createUser)
router.post("/name/delete",deleteUser)
router.patch("/name/update",updateUser)

//category


export default router;