// controllers/productController.js

import fs from "fs";
import path from "path";
import Product from "../models/Products.js"; // Make sure file is named Products.js
import Category from "../models/Category.js";
import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/httpStatus.js";
import { successResponse, errorResponse } from "../constants/response.js";

// -------------------------------------------------------------
// HELPER: Build Full Image URL
// -------------------------------------------------------------
const buildImageUrl = (req, filename) => {
  if (!filename) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

// -------------------------------------------------------------
// CREATE PRODUCT
// -------------------------------------------------------------
export const createProduct = async (req, res) => {
  try {
    const { name, categorySlug, price, stock, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !categorySlug || price === undefined || stock === undefined || !image) {
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.ALL_FIELDS_REQUIRED);
    }

    // Check category exists
    const category = await Category.findOne({ Slug: categorySlug });
    if (!category) {
      return errorResponse(res, STATUS.BAD_REQUEST, "Category does not exist");
    }

    const product = await Product.create({
      name,
      categorySlug,
      price,
      stock,
      description: description || "",
      image,
    });

    return successResponse(
      res,
      STATUS.CREATED,
      { ...product.toObject(), image: buildImageUrl(req, product.image) },
      MESSAGES.PRODUCT.PRODUCT_CREATED
    );

  } catch (error) {
    console.error("Create Product Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// -------------------------------------------------------------
// GET ALL PRODUCTS
// -------------------------------------------------------------
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).populate("category");

    const updated = products.map((prod) => ({
      ...prod.toObject(),
      image: buildImageUrl(req, prod.image),
    }));

    return successResponse(res, STATUS.SUCCESS, updated, MESSAGES.PRODUCT.PRODUCT_FETCHED);
  } catch (error) {
    console.error("Get Products Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// -------------------------------------------------------------
// GET PRODUCT BY ID
// -------------------------------------------------------------
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.PRODUCT.PRODUCT_NOT_FOUND);
    }

    return successResponse(
      res,
      STATUS.SUCCESS,
      { ...product.toObject(), image: buildImageUrl(req, product.image) },
      MESSAGES.PRODUCT.PRODUCT_FETCHED
    );
  } catch (error) {
    console.error("Get Product Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// -------------------------------------------------------------
// GET PRODUCTS BY CATEGORY SLUG
// -------------------------------------------------------------
export const getProductsByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const products = await Product.find({ categorySlug: slug }).populate("category");

    const updated = products.map(prod => ({
      ...prod.toObject(),
      image: buildImageUrl(req, prod.image),
    }));

    return successResponse(res, STATUS.SUCCESS, updated, MESSAGES.PRODUCT.PRODUCT_FETCHED);
  } catch (error) {
    console.error("Get Products by Category Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};


// -------------------------------------------------------------
// UPDATE PRODUCT
// -------------------------------------------------------------
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categorySlug, price, stock, description } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.PRODUCT.PRODUCT_NOT_FOUND);
    }

    if (name) product.name = name;

    if (categorySlug && categorySlug !== product.categorySlug) {
      const category = await Category.findOne({ Slug: categorySlug });
      if (!category) {
        return errorResponse(res, STATUS.BAD_REQUEST, "Category does not exist");
      }
      product.categorySlug = categorySlug;
    }

    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (description !== undefined) product.description = description;

    if (req.file) {
      const oldPath = path.join(process.cwd(), "uploads", product.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      product.image = req.file.filename;
    }

    await product.save();

    return successResponse(
      res,
      STATUS.SUCCESS,
      { ...product.toObject(), image: buildImageUrl(req, product.image) },
      MESSAGES.PRODUCT.PRODUCT_UPDATED
    );

  } catch (error) {
    console.error("Update Product Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// -------------------------------------------------------------
// DELETE PRODUCT
// -------------------------------------------------------------
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.PRODUCT.PRODUCT_NOT_FOUND);
    }

    if (product.image) {
      const filePath = path.join(process.cwd(), "uploads", product.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    return successResponse(res, STATUS.SUCCESS, null, MESSAGES.PRODUCT.PRODUCT_DELETED);
  } catch (error) {
    console.error("Delete Product Error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};
