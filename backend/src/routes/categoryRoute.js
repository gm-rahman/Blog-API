import { Router } from "express";
import { authintication } from "../middlewares/authintication.js";
import { getAllData } from "../controllers/category/getAllData.js";
import { saveData } from "../controllers/category/saveData.js";
import { deleteData } from "../controllers/category/deleteData.js";
import { updateData } from "../controllers/category/updateData.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.route("/").get(authintication, getAllData);
router.route("/").post(authintication, upload.single("imageUrl"), saveData);
router.route("/:id").put(authintication, updateData);
router.route("/:id").delete(authintication, deleteData);

export default router;
