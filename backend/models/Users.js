import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: { 
      type: String, 
      required: true 
    }, 
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
      
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// Create the model from the schema
const User = mongoose.model('User', userSchema);

export default User;
