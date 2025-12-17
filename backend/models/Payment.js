import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
 
  Order_id: {
    type: String,
    ref: "Order", // reference to Order collection
    required: true,
    index: true
  },
  Payment_method: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Net Banking", "UPI", "Cash On Delivery", "Wallet"],
    required: true
  },
  Status: {
    type: String,
    enum: ["Pending", "Completed", "Failed", "Refunded"],
    default: "Pending"
  },
  Amount: {
    type: Number,
    required: true,
    min: 0
  },
  Payment_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  Transaction_id: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

export default mongoose.model("Payment", paymentSchema);
