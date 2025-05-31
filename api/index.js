import express from "express"
import cors from "cors"
import { connectDB } from "../config/db.js"
import foodRouter from "../routes/foodRoute.js"
import userRouter from "../routes/userRoute.js"
import cartRouter from "../routes/cartRoute.js"
import orderRouter from "../routes/orderRoute.js"
import 'dotenv/config'
import { createServer } from "@vercel/node"

// Init
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect DB
connectDB()

// Routes
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/images", express.static('uploads'))

// Test
app.get("/", (req, res) => {
  res.send("API Working on Vercel")
})

export default app
