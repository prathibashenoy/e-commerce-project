import app from "./app.js";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

dotenv.config()

const PORT = process.env.PORT

connectDB()


app.listen(PORT, () => console.log(`server running on ${PORT}`))