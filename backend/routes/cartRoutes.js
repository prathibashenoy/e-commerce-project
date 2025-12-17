import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const CartRouter = express.Router();

// --------------------
// PUBLIC ROUTES
// --------------------
CartRouter.get("/", getCart);     // Guests → frontend handles localStorage
CartRouter.post("/", addToCart);  // Guests → frontend handles localStorage

// --------------------
// PROTECTED ROUTES
// --------------------
CartRouter.use(authMiddleware);

CartRouter.put("/:itemId", updateCartItem);
CartRouter.delete("/:itemId", removeCartItem);
CartRouter.delete("/", clearCart);

export default CartRouter;
