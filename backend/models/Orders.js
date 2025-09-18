import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  User_id: {
    type: String,
    ref: "User", // reference to User collection
    required: true,
    index: true
  },
  Shipping_address: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500
  },
  Order_date: {
    type: Date,
    default: Date.now, // defaults to current date/time
    required: true
  },
  Status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  Total_amount: {
    type: Number,
    required: true,
    min: 0 // cannot be negative
  }
}, {
  timestamps: true // adds createdAt & updatedAt
});

export default mongoose.model("Order", orderSchema);
