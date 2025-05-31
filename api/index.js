import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import { connectDB } from '../config/db.js';
import foodRouter from '../routes/foodRoute.js';
import userRouter from '../routes/userRoute.js';
import cartRouter from '../routes/cartRoute.js';
import orderRouter from '../routes/orderRoute.js';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('API Working on Vercel');
});

export const handler = serverless(app);
