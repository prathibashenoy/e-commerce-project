// controllers/categoryController.js

import fs from "fs";
import path from "path";
import Category from "../models/Category.js";
import Product from "../models/Products.js";
import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/httpStatus.js";
import { successResponse, errorResponse } from "../constants/response.js";


// -------------------------------------------------------------
// HELPER: Generate Slug
// -------------------------------------------------------------
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

// -------------------------------------------------------------
// HELPER: Build Full Image URL
// -------------------------------------------------------------
const buildImageUrl = (req, filename) => {
  if (!filename) return null;
  return `${process.env.BASE_URL}/uploads/${filename}`;
};

// -------------------------------------------------------------
// CREATE CATEGORY
// -------------------------------------------------------------
export const createCategory = async (req, res) => {
  try {
    const { Name, Description, IsActive } = req.body;
    const Image = req.file ? req.file.filename : null;

    if (!Name || !Image) {
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.ALL_FIELDS_REQUIRED);
    }

    const Slug = generateSlug(Name);

    // Check duplicates
    const existingCategory = await Category.findOne({ $or: [{ Name }, { Slug }] });
    if (existingCategory) {
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.CATEGORY.CATEGORY_EXIST);
    }

    const category = await Category.create({
      Name,
      Slug,
      Description,
      Image, // filename only
      IsActive: IsActive !== undefined ? IsActive : true,
    });

    return successResponse(
      res,
      STATUS.CREATED,
      { ...category.toObject(), Image: buildImageUrl(req, category.Image) },
      MESSAGES.CATEGORY.CATEGORY_CREATED
    );

  } catch (error) {
    console.error("Create Category Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// -------------------------------------------------------------
// GET ALL CATEGORIES
// -------------------------------------------------------------
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    const updated = categories.map((cat) => ({
      ...cat.toObject(),
      Image: buildImageUrl(req, cat.Image),
    }));

    return successResponse(
      res,
      STATUS.SUCCESS,
      updated,
      MESSAGES.CATEGORY.CATEGORY_FETCHED
    );

  } catch (error) {
    console.error("Get Categories Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// -------------------------------------------------------------
// GET CATEGORY BY ID
// -------------------------------------------------------------
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.CATEGORY.CATEGORY_NOT_FOUND);
    }

    return successResponse(
      res,
      STATUS.SUCCESS,
      { ...category.toObject(), Image: buildImageUrl(req, category.Image) },
      MESSAGES.CATEGORY.CATEGORY_FETCHED
    );

  } catch (error) {
    console.error("Get Category Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// -------------------------------------------------------------
// UPDATE CATEGORY
// -------------------------------------------------------------
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Description, IsActive } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.CATEGORY.CATEGORY_NOT_FOUND);
    }

    // Update Name & Slug
    if (Name && Name !== category.Name) {
      const newSlug = generateSlug(Name);

      // Check duplicate slug in other category
      const exists = await Category.findOne({
        Slug: newSlug,
        _id: { $ne: id },
      });

      if (exists) {
        return errorResponse(res, STATUS.BAD_REQUEST, "Category name already exists");
      }

      category.Name = Name;
      category.Slug = newSlug;
    }

    // Update Description
    if (Description !== undefined) category.Description = Description;

    // Update Active Status
    if (IsActive !== undefined) category.IsActive = IsActive;

    // Update Image
    if (req.file) {
      const oldPath = path.join(process.cwd(), "uploads", category.Image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      category.Image = req.file.filename;
    }

    await category.save();

    return successResponse(
      res,
      STATUS.SUCCESS,
      { ...category.toObject(), Image: buildImageUrl(req, category.Image) },
      MESSAGES.CATEGORY.CATEGORY_UPDATED
    );

  } catch (error) {
    console.error("Update Category Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// -------------------------------------------------------------
// DELETE CATEGORY
// -------------------------------------------------------------
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return errorResponse(
        res,
        STATUS.NOT_FOUND,
        MESSAGES.CATEGORY.CATEGORY_NOT_FOUND
      );
    }

    // Delete category image file
    if (category.Image) {
      const filePath = path.join(process.cwd(), "uploads", category.Image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    // -------------------------------------------------------------
    // CASCADE DELETE PRODUCTS WITH SAME categorySlug
    // -------------------------------------------------------------
    await Product.deleteMany({ categorySlug: category.Slug });

    return successResponse(
      res,
      STATUS.SUCCESS,
      null,
      MESSAGES.CATEGORY.CATEGORY_DELETED
    );

  } catch (error) {
    console.error("Delete Category Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};