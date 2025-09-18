import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Order_id: {
    type: String,
    ref: "Order", // reference to Order collection
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
    min: 1 // must be at least 1
  },
  Price: {
    type: Number,
    required: true,
    min: 0 // cannot be negative
  }
}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

export default mongoose.model("OrderItem", orderItemSchema);
