import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/User.js";
import doctorRoutes from "./routes/Doctor.js";
import { connectdb } from "./config/dbconfig.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


/* ROUTES */
app.use("/user",userRoutes);
app.use("/doctor",doctorRoutes);

const PORT = process.env.PORT || 6969;

app.listen(PORT,() => {
    connectdb();
    console.log(`Server running on PORT ${PORT} 🔥`);
})
