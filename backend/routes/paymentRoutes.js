// backend/routes/paymentRouter.js
import express from "express";
import Stripe from "stripe";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import Order from "../models/Orders.js";
import { sendOrderSuccessEmail } from "../utils/sendEmail.js";

const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1️⃣ CREATE CHECKOUT SESSION
paymentRouter.post("/create-checkout-session", authMiddleware, async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // paise
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
    console.error("Stripe Error:",err);
    res.status(500).json({ message: "Payment failed" });
  }
});

// 2️⃣ PAYMENT SUCCESS (VERIFY + ORDER + EMAIL)
paymentRouter.post("/payment-success", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Verify Stripe payment
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not verified" });
    }

    // Prevent duplicate order
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
    if (existingOrder) return res.json({ message: "Order already exists" });

    // Get cart info from metadata
    const cartItems = JSON.parse(session.metadata.cartItems);
    const totalAmount = parseFloat(session.metadata.totalAmount);

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cartItems,
      totalAmount,
      paymentStatus: "Paid",
      stripeSessionId: sessionId,
    });

    // Send order confirmation email
    await sendOrderSuccessEmail(req.user, order);

    res.status(201).json({ message: "Order placed & email sent", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order failed" });
  }
});

export default paymentRouter;
