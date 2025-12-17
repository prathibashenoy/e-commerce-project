//models/Address.js

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

  User_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
    index: true // faster lookup for user’s addresses
  },
  Type: { 
    type: String, 
    enum: ["home", "work", "other"], // restrict values
    default: "home"
  },
  Street: { 
    type: String, 
    trim: true, 
    minlength: 3, 
    maxlength: 255 
  },
  City: { 
    type: String, 
    trim: true, 
    minlength: 2, 
    maxlength: 100 
  },
  State: { 
    type: String, 
    trim: true, 
    minlength: 2, 
    maxlength: 100 
  },
  Country: { 
    type: String, 
    trim: true, 
    default: "India", 
    minlength: 2, 
    maxlength: 100 
  },
  Pincode: { 
    type: String, 
    match: /^[0-9]{6}$/, // only numbers, 6 digits
    minlength: 6,
    maxlength: 6,
    required: true 
  }
}, {
  timestamps: true // adds createdAt & updatedAt fields automatically
});

export default mongoose.model("Address", addressSchema);
