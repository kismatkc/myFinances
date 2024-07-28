import express from "express"
import { createUser, deleteUser, getUser ,updateUser} from "../controllers/category-controller.js";

 const router = express.Router();

router.get("/category",getUser);
router.post("/category",createUser)
router.post("/category/delete",deleteUser)
router.patch("/category/update",updateUser)

export default router;