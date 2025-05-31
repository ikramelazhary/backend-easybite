import express from "express"
import cors from "cors"
import { connectDB } from "../config/db.js"
import foodRouter from "../routes/foodRoute.js"
import userRouter from "../routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "../routes/cartRoute.js"
import orderRouter from "../routes/orderRoute.js"
import serverless from "serverless-http";
import cloudinaryPkg from 'cloudinary';
const { v2: cloudinary } = cloudinaryPkg;
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)



app.get("/",(req,res)=>{
    res.send("API Working")
})



app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// Export pour Vercel
export default serverless(app);
//mongodb+srv://ikramelazhary78:UiX1Uh0my1dl5BpB@cluster0.4u12arw.mongodb.net/?