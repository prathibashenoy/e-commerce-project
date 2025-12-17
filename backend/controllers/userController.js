//controllers/userController.js

import { MESSAGES } from "../constants/messages.js"
import generateToken from "../utils/generateToken.js";
import { STATUS } from "../constants/httpStatus.js";
import User from "../models/Users.js";
import bcrypt from 'bcrypt';
import { successResponse, errorResponse } from "../constants/response.js";
import jwt from "jsonwebtoken";


// @desc Register new patient
// @route POST/api/users/register
// @access Public 


export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role: role || "customer",
    });
     console.log("JWT_SECRET=",process.env.JWT_SECRET);
     
    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("token=",token);
    
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// @desc login user
// @route POST/api/users/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};


// @desc get all users
// @route POST/api/users/
// @access Admin
export const getUsers = async (req, res) => {
    console.log(req.user);
    
      try{
      const users=await User.find({})
      return successResponse(res,STATUS.OK,users,MESSAGES.USER_FETCHED)
    }
 catch(error){
      console.error(error)
 return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
    }
}

// @desc GET single users
// @route GET/api/users/:id
// @access Admin/User
export const getUserById = async (req, res) => {
    try{
    const user=await User.findById(req.params.id)
     if(!user){
    return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.NOT_FOUND)
  }
    return successResponse(res,STATUS.OK,user,MESSAGES.USER_FETCHED)
  }
  catch(error){
    console.error(error)
    return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
  }
}

// @desc   update user
//          - Normal users can update only their email
//          - Admins can update email, role, and status
//          - Password is not updated here (use changeUserPassword)

// @route   PUT/api/users/update/:id
// @access Admin/User
export const updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Find the user
    const user = await User.findById(req.params.id);
    if (!user) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    // If password provided, hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updates
    const updatedUser = await user.save();

    return successResponse(res, STATUS.OK, updatedUser, MESSAGES.USER_UPDATED);
  } catch (error) {
    console.error("Update user error:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

// @desc  delete user
// @route   DELETE/api/users/delete/:id
// @access Admin/User
export const deleteUser = async (req, res) => {
    try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne(user._id);
      return successResponse(res, STATUS.SUCCESS, null, MESSAGES.USER_DELETED);
    } else {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};


export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword; // will be hashed by pre-save middleware
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

