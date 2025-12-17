import Cart from "../models/Cart.js"; // Only import Cart, no User needed
import { STATUS } from "../constants/httpStatus.js";
import { successResponse, errorResponse } from "../constants/response.js";
import { MESSAGES } from "../constants/messages.js";

// ------------------------------
// GET CART (Guest → empty, User → DB)
// ------------------------------
export const getCart = async (req, res) => {
  try {
    if (!req.user) {
      // Guest cart handled in frontend
      return successResponse(res, STATUS.SUCCESS, { items: [] }, "Guest cart");
    }

    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    return successResponse(res, STATUS.SUCCESS, cart, "Cart fetched successfully");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

// ------------------------------
// ADD TO CART (Logged-in only, guest handled in frontend)
// ------------------------------
export const addToCart = async (req, res) => {
  try {
    if (!req.user) {
      return successResponse(res, STATUS.SUCCESS, {}, "Guest cart handled on frontend");
    }

    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = await Cart.create({ userId: req.user._id, items: [] });

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index > -1) {
      cart.items[index].qty += quantity;
    } else {
      cart.items.push({ productId, qty: quantity });
    }

    await cart.save();
    return successResponse(res, STATUS.SUCCESS, cart, "Item added to cart");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

// ------------------------------
// UPDATE CART ITEM QUANTITY
// ------------------------------
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return errorResponse(res, STATUS.NOT_FOUND, "Cart not found");

    const item = cart.items.id(itemId);
    if (!item) return errorResponse(res, STATUS.NOT_FOUND, "Item not found");

    item.qty = quantity;
    await cart.save();

    return successResponse(res, STATUS.SUCCESS, cart, "Cart updated");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

// ------------------------------
// REMOVE CART ITEM
// ------------------------------
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return errorResponse(res, STATUS.NOT_FOUND, "Cart not found");

    cart.items.id(itemId)?.remove();
    await cart.save();

    return successResponse(res, STATUS.SUCCESS, cart, "Item removed");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

// ------------------------------
// CLEAR CART
// ------------------------------
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return errorResponse(res, STATUS.NOT_FOUND, "Cart not found");

    cart.items = [];
    await cart.save();

    return successResponse(res, STATUS.SUCCESS, cart, "Cart cleared");
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};
