// models/Orders.js - FIXED VERSION
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Paid",
    },
    stripeSessionId: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate orders
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);