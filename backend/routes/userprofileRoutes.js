// routes/userprofileRoutes.js


import express from "express";
import { createUserProfiles } from "../controllers/userprofileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userprofileRouter = express.Router();

// Protected route: User completes profile
userprofileRouter.post("/:userId", authMiddleware, createUserProfiles);

export default userprofileRouter;






/*

import express from "express";
import { 
  createUserProfiles,
  getAllUserProfile,
  getOneUserProfile,
  updateUserProfile,
  deleteUserProfile
} from "../controllers/userprofileController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const UserProfileRouter = express.Router();

// @route POST /api/userprofiles/:userId
// @desc  Create a user profile
// @access Admin or the user themselves
UserProfileRouter.post("/:userId", authMiddleware, async (req, res, next) => {
  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, createUserProfiles);

// @route GET /api/userprofiles
// @desc  Get all user profiles
// @access Admin only
UserProfileRouter.get("/", authMiddleware, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, getAllUserProfile);

// @route GET /api/userprofiles/:userId
// @desc  Get one user profile
// @access Admin or the user themselves
UserProfileRouter.get("/:userId", authMiddleware, async (req, res, next) => {
  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, getOneUserProfile);

// @route PUT /api/userprofiles/:userId
// @desc  Update user profile
// @access Admin or the user themselves
UserProfileRouter.put("/:userId", authMiddleware, async (req, res, next) => {
  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, updateUserProfile);

// @route DELETE /api/userprofiles/:userId
// @desc  Delete user profile
// @access Admin or the user themselves
UserProfileRouter.delete("/:userId", authMiddleware, async (req, res, next) => {
  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, deleteUserProfile);

export default UserProfileRouter;


*/