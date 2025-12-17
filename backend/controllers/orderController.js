// controllers/orderController.js

import Order from "../models/Orders.js";
import { STATUS } from "../constants/httpStatus.js";
import { successResponse, errorResponse } from "../constants/response.js";
import { MESSAGES } from "../constants/messages.js";

// Create new order (customer only)
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      status: "Pending"
    });

    return successResponse(res, STATUS.CREATED, order, "Order placed successfully");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

// Get orders
export const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.isAdmin) {
      orders = await Order.find().populate("user", "username email");
    } else {
      orders = await Order.find({ user: req.user._id }).populate("user", "username email");
    }
    return successResponse(res, STATUS.SUCCESS, orders, "Orders fetched successfully");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "username email");
    if (!order) return errorResponse(res, STATUS.NOT_FOUND, "Order not found");

    if (req.user.role !== "admin" && order.user._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, STATUS.FORBIDDEN, "Access denied");
    }

    return successResponse(res, STATUS.SUCCESS, order, "Order fetched successfully");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return errorResponse(res, STATUS.NOT_FOUND, "Order not found");

    order.status = status;
    await order.save();

    return successResponse(res, STATUS.SUCCESS, order, "Order status updated");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};
