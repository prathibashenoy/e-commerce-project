import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword, // ✅ import the new controller
} from "../controllers/userController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const UserRouter = express.Router();

/* ------------------------------------------------------------------
   AUTH ROUTES
------------------------------------------------------------------ */

// @route   POST /api/users/register
// @desc    Register user
// @access  Public
UserRouter.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user (returns token + user info)
// @access  Public
UserRouter.post("/login", loginUser);

/* ------------------------------------------------------------------
   PROTECTED ROUTES (JWT PROVIDES USER INFO)
------------------------------------------------------------------ */

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Admin
UserRouter.get(
  "/",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
  getUsers
);

// @route   GET /api/users/:id
// @desc    Get user by ID (admin or same user)
// @access  Admin/User
UserRouter.get(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
  getUserById
);

// @route   PUT /api/users/update/:id
// @desc    Update user (admin or same user)
// @access  Admin/User
UserRouter.put(
  "/update/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
  updateUser
);

// @route   DELETE /api/users/delete/:id
// @desc    Delete user (admin or same user)
// @access  Admin/User
UserRouter.delete(
  "/delete/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
  deleteUser
);

/* ------------------------------------------------------------------
   CHANGE PASSWORD
------------------------------------------------------------------ */

// @route   PUT /api/users/change-password
// @desc    Change password for logged-in user
// @access  Authenticated users
UserRouter.put("/change-password", authMiddleware, changePassword);

export default UserRouter;
