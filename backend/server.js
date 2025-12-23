import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

/* ------------------ FIX __dirname ------------------ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ------------------ DB ------------------ */
connectDB();

/* ------------------ MIDDLEWARE ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // allow all origins for now
    credentials: true,
  })
);

/* ------------------ STATIC FILES ------------------ */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ------------------ ROUTES ------------------ */
app.get("/api", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/users", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

/* ------------------ ROOT ------------------ */
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

/* ------------------ CONDITIONAL PORT LISTEN ------------------ */
// Render (or any platform) needs a port; serverless platforms like Vercel do NOT
if (process.env.NODE_ENV !== "vercel") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for serverless (Vercel, Netlify, etc.)
export default app;
