import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", upload.single("Image"), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", upload.single("Image"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
