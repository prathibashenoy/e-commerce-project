import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },

    image: {
      type: String,
      default: "",
    },

    categorySlug: {
      type: String,
      required: true,
      index: true,
      ref: "Category", // references category.slug
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
  },
  { timestamps: true }
);

// Populate virtual category by slug
productSchema.virtual("category", {
  ref: "Category",
  localField: "categorySlug",
  foreignField: "slug",
  justOne: true,
});

export default mongoose.model("Product", productSchema);
