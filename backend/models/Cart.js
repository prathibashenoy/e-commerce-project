import mongoose from "mongoose";

// --------------------
// Individual Cart Item
// --------------------
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Links to Product collection
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  { _id: true } // Each cart item gets its own _id so we can delete/update easily
);

// --------------------
// Cart Schema
// --------------------
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Links to Users collection
      required: true,
      unique: true, // Each user has only one cart
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
