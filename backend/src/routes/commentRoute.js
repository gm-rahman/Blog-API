import { Router } from "express";
import { authintication } from "../middlewares/authintication.js";
import { saveData } from "../controllers/comment/saveData.js";
import { getAllData } from "../controllers/comment/getAllData.js";
import { updateData } from "../controllers/comment/updateData.js";
import { deleteData } from "../controllers/comment/deleteData.js";
import { getData } from "../controllers/comment/getData.js";

const router = Router();

router.route("/").post(authintication, saveData);
router.route("/:blog_id").get(authintication, getAllData);
router.route("/").get(authintication, getData);
router.route("/:id").put(authintication, updateData);
router.route("/:id").delete(authintication, deleteData);

export default router;
