//import dotenv from "dotenv";
/*

import express from 'express';
import userRoutes from "./routes/userRoutes.js"; 
//import userProfileRoutes from "./routes/userprofileRoutes.js"; 
import addressRoutes from "./routes/addressRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"; 
import productRoutes from "./routes/productRoutes.js"; 
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";




/*
import paymentRoutes from "./routes/paymentRoutes.js"; 
import orderRoutes from "./routes/orderRoutes.js"; 
import orderItemRoutes from "./routes/orderitemRoutes.js"; 
import cartRoutes from "./routes/cartRoutes.js"; 
import cartitemRoutes from "./routes/cartitemRoutes.js"; 
 */

/*
import cors from "cors";

import path from 'path';

const app = express();

//Middlewares to handle CORS

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes)
//app.use("/api/userprofiles",userProfileRoutes)
app.use("/api/address",addressRoutes)

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))

app.use("/api/category",categoryRoutes)
app.use("/api/product",productRoutes)
//app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/payment",paymentRoutes)

/*

app.use("/api/order",orderRoutes)
app.use("/api/orderitem",orderitemRoutes)
app.use("/api/cart",cartRoutes)
app.use("cartitem",cartitemRoutes)
*/
/*
app.get("/", (req, res) => {
  res.send("API is running successfully...");
});

export default app;



*/