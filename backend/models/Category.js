import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Slug: {
      type: String,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
    },
    IsActive: {
      type: Boolean,
      default: true,
    },
    // ✅ LOWERCASE image (IMPORTANT)
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
