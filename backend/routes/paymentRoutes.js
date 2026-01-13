// backend/routes/paymentRoutes.js
import express from "express";
import Stripe from "stripe";
import Order from "../models/Orders.js";
import { sendOrderSuccessEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";
import { authMiddleware } from "../middlewares/authMiddleware.js";

dotenv.config({ path: "./.env" });

const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* --------------------------------------------------
   1️⃣ CREATE STRIPE CHECKOUT SESSION
-------------------------------------------------- */
paymentRouter.post(
  "/create-checkout-session",
  authMiddleware,
  async (req, res) => {
    try {
      const { cartItems } = req.body;

      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // ✅ NORMALIZE CART ITEMS (IMAGE → STRING)
      const normalizedCartItems = cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image:
          typeof item.image === "string"
            ? item.image
            : item.image?.url || "",
      }));

      // Stripe line items
      const line_items = normalizedCartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      const totalAmount = normalizedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",

        customer_email: req.user.email,

        line_items,

        // ✅ SAFE METADATA
        metadata: {
          userId: req.user._id.toString(),
          cartItems: JSON.stringify(normalizedCartItems),
          totalAmount: totalAmount.toString(),
        },

        success_url: `${process.env.CLIENT_URL}/customer/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/customer/checkout`,
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error("Stripe Error:", err);
      res.status(500).json({
        message: "Payment failed",
        error: err.message,
      });
    }
  }
);

/* --------------------------------------------------
   2️⃣ PAYMENT SUCCESS VERIFICATION
-------------------------------------------------- */
paymentRouter.get("/payment-success", async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ message: "Session ID required" });
    }

    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not verified" });
    }

    // Prevent duplicate orders
    const existingOrder = await Order.findOne({
      stripeSessionId: session_id,
    });

    if (existingOrder) {
      return res.json({
        message: "Order already exists",
        order: existingOrder,
        emailSent: false,
      });
    }

    // Parse metadata
    const cartItems = JSON.parse(session.metadata.cartItems);
    const totalAmount = parseFloat(session.metadata.totalAmount);

    // ✅ CREATE ORDER (IMAGE IS STRING)
    const order = await Order.create({
      user: session.metadata.userId,
      items: cartItems,
      totalAmount,
      paymentStatus: "Paid",
      stripeSessionId: session_id,
    });

    let emailSent = false;

    // Optional email
    if (
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      session.customer_email
    ) {
      try {
        await sendOrderSuccessEmail(
          { email: session.customer_email, name: "Customer" },
          order
        );
        emailSent = true;
      } catch (err) {
        console.warn("Email not sent:", err.message);
      }
    }

    res.json({
      message: "Payment verified",
      order,
      emailSent,
    });
  } catch (err) {
    console.error("Payment Success Error:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

export default paymentRouter;
