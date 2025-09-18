import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200
  },
  Category: {
    type: String,
    ref: "Category", // reference to Category collection
    required: true,
    index: true
  },
  Price: {
    type: Number,
    required: true,
    min: 0 // price cannot be negative
  },
  Stock: {
    type: Number,
    required: true,
    min: 0, // stock cannot be negative
    integer: true // only integers allowed
  },
  Description: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: ""
  }
}, {
  timestamps: true // adds createdAt & updatedAt
});

export default mongoose.model("Product", productSchema);
