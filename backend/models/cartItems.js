import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Cart_id: {
    type: String,
    ref: "Cart", // reference to Cart collection
    required: true,
    index: true
  },
  Product_id: {
    type: String,
    ref: "Product", // reference to Product collection
    required: true,
    index: true
  },
  Quantity: {
    type: Number,
    required: true,
    min: 1 // at least 1 product per cart item
  }
}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

export default mongoose.model("CartItem", cartItemSchema);
