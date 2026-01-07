// middlewares/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req) => ({
    folder: req.baseUrl.includes("product")
      ? "ecommerce/products"
      : "ecommerce/categories",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  }),
});

export const upload = multer({ storage });
