import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cart.js';
import addressRoutes from './routes/address.js';
import orderRoutes from './routes/order.js';


dotenv.config();
connectDB();

const app=express();


app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/address',addressRoutes);
app.use('/api/order',orderRoutes);


app.get("/",(req, res)=>{
    res.send("API is working");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
 console.log(`Server running on ${PORT}`);
});
