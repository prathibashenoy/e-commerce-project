// routes/categoryRoutes.js

import express from "express";
import { upload } from "../middlewares/upload.js";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const CategoryRouter = express.Router();

// Create category
CategoryRouter.post("/", upload.single("Image"), createCategory);

// Get all categories
CategoryRouter.get("/", getCategories);

// Get single category
CategoryRouter.get("/:id", getCategoryById);

// Update category with image
CategoryRouter.put("/:id", upload.single("Image"), updateCategory);

// Delete category
CategoryRouter.delete("/:id", deleteCategory);

export default CategoryRouter;
