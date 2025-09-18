import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

export default mongoose.model("Cart", cartSchema);
