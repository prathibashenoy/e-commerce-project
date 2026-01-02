import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

/* ------------------ DB ------------------ */
connectDB();

/* ------------------ MIDDLEWARE ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

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

/* ------------------ START SERVER ------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
