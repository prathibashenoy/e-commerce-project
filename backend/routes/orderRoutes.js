// routes/orderRoutes.js
import express from "express";
import Order from "../models/Orders.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

/* -----------------------------
   CUSTOMER – MY ORDERS
-------------------------------- */
orderRouter.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* -----------------------------
   ADMIN – ALL ORDERS
-------------------------------- */
orderRouter.get("/admin/orders", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    console.log(orders);
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
});

export default orderRouter;
