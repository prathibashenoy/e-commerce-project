import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
console.log("ENV CHECK (Stripe key):", process.env.STRIPE_SECRET_KEY);
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import UserRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js"; // make sure this file exists

const app = express();

// ✅ Connect to MongoDB
connectDB();
const cors = require('cors');

// Allow requests from your frontend URL only:
app.use(cors({
  origin: 'https://e-commerce-project-swart.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Or to allow all origins (less secure, but quick test):
// app.use(cors());


// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/users", UserRouter);
app.use("/api/payments", paymentRouter); // mounted payment routes

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});
