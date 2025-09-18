import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  User_id: { 
    type: String, 
    ref: "User", 
    required: true, 
    index: true // faster lookup
  },
  Phone: { 
    type: Number, 
    required: true, 
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v); // exactly 10 digits
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  Dob: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(v) {
        return v < new Date(); // DOB cannot be in the future
      },
      message: props => `Date of Birth cannot be in the future!`
    }
  },
  Gender: { 
    type: String, 
    enum: ["Male", "Female", "Other"], 
    required: true
  }
}, {
  timestamps: true // automatically adds createdAt & updatedAt
});

export default mongoose.model("UserProfile", userProfileSchema);
