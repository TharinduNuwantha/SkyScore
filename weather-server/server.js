import express from "express";
import cors from "cors"
import "dotenv/config";
import weatherRoutes from "./routes/weatherRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/weather", weatherRoutes)
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));