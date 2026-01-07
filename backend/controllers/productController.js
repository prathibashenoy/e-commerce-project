import Product from "../models/Products.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import { successResponse, errorResponse } from "../constants/response.js";
import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

// ================= CREATE =================
export const createProduct = async (req, res) => {
  try {
    const { name, categorySlug, price, stock, description } = req.body;

    if (
      !name ||
      !categorySlug ||
      price === undefined ||
      stock === undefined ||
      !req.file
    ) {
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.ALL_FIELDS_REQUIRED);
    }

    const category = await Category.findOne({ Slug: categorySlug });
    if (!category) {
      return errorResponse(res, STATUS.BAD_REQUEST, "Category does not exist");
    }

    const product = await Product.create({
      name,
      categorySlug,
      price,
      stock,
      description,
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    return successResponse(
      res,
      STATUS.CREATED,
      product,
      MESSAGES.PRODUCT.PRODUCT_CREATED
    );
  } catch (err) {
    console.error("Create product error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= GET ALL =================
export const getProducts = async (req, res) => {
  try {
    const data = await Product.find().sort({ createdAt: -1 });
    return successResponse(
      res,
      STATUS.SUCCESS,
      data,
      MESSAGES.PRODUCT.PRODUCT_FETCHED
    );
  } catch (err) {
    console.error("Get products error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= GET ONE =================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return errorResponse(
        res,
        STATUS.NOT_FOUND,
        MESSAGES.PRODUCT.PRODUCT_NOT_FOUND
      );
    }

    return successResponse(
      res,
      STATUS.SUCCESS,
      product,
      MESSAGES.PRODUCT.PRODUCT_FETCHED
    );
  } catch (err) {
    console.error("Get product error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= BY CATEGORY =================
export const getProductsByCategorySlug = async (req, res) => {
  try {
    const data = await Product.find({ categorySlug: req.params.slug });
    return successResponse(
      res,
      STATUS.SUCCESS,
      data,
      MESSAGES.PRODUCT.PRODUCT_FETCHED
    );
  } catch (err) {
    console.error("Get product by category error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= UPDATE =================
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return errorResponse(
        res,
        STATUS.NOT_FOUND,
        MESSAGES.PRODUCT.PRODUCT_NOT_FOUND
      );
    }

    Object.assign(product, req.body);

    if (req.file) {
      // ✅ SAFE CLOUDINARY DELETE
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      product.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await product.save();

    return successResponse(
      res,
      STATUS.SUCCESS,
      product,
      MESSAGES.PRODUCT.PRODUCT_UPDATED
    );
  } catch (err) {
    console.error("Update product error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ================= DELETE =================
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return errorResponse(
        res,
        STATUS.NOT_FOUND,
        MESSAGES.PRODUCT.PRODUCT_NOT_FOUND
      );
    }

    // ✅ SAFE CLOUDINARY DELETE
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    return successResponse(
      res,
      STATUS.SUCCESS,
      null,
      MESSAGES.PRODUCT.PRODUCT_DELETED
    );
  } catch (err) {
    console.error("Delete product error:", err);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};
