import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import UserRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";

import path from "path";
import { fileURLToPath } from "url";


const app = express();

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Connect to MongoDB
connectDB();

// ✅ Allowed frontend origins (Vercel)
const allowedOrigins = [
  "https://e-commerce-project-sb2a.vercel.app",
  //"https://e-commerce-project-swart.vercel.app"
];

// ✅ CORS middleware (FIXED)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server / Postman requests (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  })
);

// ✅ Body parser
app.use(express.json());


// ✅ STATIC UPLOADS (THIS FIXES YOUR ISSUE)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// ✅ Routes
app.use("/api/users", UserRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});
