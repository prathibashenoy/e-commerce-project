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
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },

    categorySlug: {
      type: String,
      required: true,
      index: true,
      ref: "Category",
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

productSchema.virtual("category", {
  ref: "Category",
  localField: "categorySlug",
  foreignField: "Slug",
  justOne: true,
});

export default mongoose.model("Product", productSchema);
