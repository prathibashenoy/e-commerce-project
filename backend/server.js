import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
// import other routes...

dotenv.config();

const app = express();

/* ✅ CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://YOUR-FRONTEND.vercel.app", // replace later
    ],
    credentials: true,
  })
);

/* ✅ Body parser */
app.use(express.json());

/* ✅ Routes */
app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
