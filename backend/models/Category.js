import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  Description: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ""
  }
}, {
  timestamps: true // automatically adds createdAt & updatedAt
});

export default mongoose.model("Category", categorySchema);
