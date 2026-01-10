//controllers/categoryControllers.js

import Category from "../models/Category.js";
import Product from "../models/Products.js";
import cloudinary from "../config/cloudinary.js";
import { successResponse, errorResponse } from "../constants/response.js";
import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

// ================= CREATE =================
export const createCategory = async (req, res) => {
  try {
    const { Name, Description, IsActive } = req.body;

    if (!Name || !req.file) {
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.ALL_FIELDS_REQUIRED);
    }

    const Slug = generateSlug(Name);

    const exists = await Category.findOne({ $or: [{ Name }, { Slug }] });
    if (exists) {
      return errorResponse(
        res,
        STATUS.BAD_REQUEST,
        MESSAGES.CATEGORY.CATEGORY_EXIST
      );
    }

    const category = await Category.create({
      Name,
      Slug,
      Description,
      IsActive,
      // ✅ FIXED: lowercase image
      image: {
        url: req.file.secure_url,          // Cloudinary URL
        public_id: req.file.public_id,
      },
    });

    return successResponse(
      res,
      STATUS.CREATED,
      category,
      MESSAGES.CATEGORY.CATEGORY_CREATED
    );
  } catch (err) {
    console.error("Create category error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= GET ALL =================
export const getCategories = async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    return successResponse(
      res,
      STATUS.SUCCESS,
      data,
      MESSAGES.CATEGORY.CATEGORY_FETCHED
    );
  } catch (err) {
    console.error("Get categories error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= GET ONE =================
export const getCategoryById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      return errorResponse(
        res,
        STATUS.NOT_FOUND,
        MESSAGES.CATEGORY.CATEGORY_NOT_FOUND
      );
    }

    return successResponse(
      res,
      STATUS.SUCCESS,
      data,
      MESSAGES.CATEGORY.CATEGORY_FETCHED
    );
  } catch (err) {
    console.error("Get category error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= UPDATE =================
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return errorResponse(
        res,
        STATUS.NOT_FOUND,
        MESSAGES.CATEGORY.CATEGORY_NOT_FOUND
      );
    }

    if (req.body.Name && req.body.Name !== category.Name) {
      category.Name = req.body.Name;
      category.Slug = generateSlug(req.body.Name);
    }

    if (req.body.Description !== undefined)
      category.Description = req.body.Description;

    if (req.body.IsActive !== undefined)
      category.IsActive = req.body.IsActive;

    if (req.file) {
      // ✅ FIXED: lowercase image
      if (category.image?.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }

      category.image = {
        url: req.file.secure_url,
        public_id: req.file.public_id,
      };
    }

    await category.save();

    return successResponse(
      res,
      STATUS.SUCCESS,
      category,
      MESSAGES.CATEGORY.CATEGORY_UPDATED
    );
  } catch (err) {
    console.error("Update category error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= DELETE =================
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

    // ✅ FIXED: lowercase image
    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    await Product.deleteMany({ categorySlug: category.Slug });

    return successResponse(
      res,
      STATUS.SUCCESS,
      null,
      MESSAGES.CATEGORY.CATEGORY_DELETED
    );
  } catch (err) {
    console.error("Delete category error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};
