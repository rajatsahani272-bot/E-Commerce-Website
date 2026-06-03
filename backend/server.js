import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from './routes/productsRoutes.js';

dotenv.config();

const app=express();


app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use('/api/products',productRoutes);


app.get("/",(req, res)=>{
    res.send("API is working");
})

app.listen(5001,()=>{
    console.log("Server is running at port 5001");
});

connectDB();