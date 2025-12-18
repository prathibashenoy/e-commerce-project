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

// 1️⃣ Create Checkout Session
paymentRouter.post("/create-checkout-session", authMiddleware, async (req, res) => {
  try {
    const { cartItems } = req.body;
    if (!cartItems || cartItems.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      metadata: {
        userId: req.user._id.toString(),
        cartItems: JSON.stringify(cartItems),
        totalAmount: totalAmount.toString(),
      },
      success_url: `${process.env.CLIENT_URL}/customer/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/customer/checkout`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
});

// 2️⃣ Payment Success Verification (public route)
paymentRouter.get("/payment-success", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ message: "Session ID required" });

    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not verified" });
    }

    // Check duplicate
    const existingOrder = await Order.findOne({ stripeSessionId: session_id });
    if (existingOrder) return res.json({ message: "Order already exists", order: existingOrder });

    // Parse cart data
    const cartItems = JSON.parse(session.metadata.cartItems);
    const totalAmount = parseFloat(session.metadata.totalAmount);

    // Create order
    const order = await Order.create({
      user: session.metadata.userId,
      items: cartItems,
      totalAmount,
      paymentStatus: "Paid",
      stripeSessionId: session_id,
    });

    // Send email (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await sendOrderSuccessEmail({ email: session.customer_email }, order);
      } catch (err) {
        console.warn("Email not sent:", err.message);
      }
    }

    res.json({ message: "Payment verified", order });
  } catch (err) {
    console.error("Payment Success Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default paymentRouter;
