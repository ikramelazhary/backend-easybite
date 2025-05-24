import mongoose from "mongoose";

 export const connectDB = async () => {
 await mongoose.connect('mongodb+srv://ikramelazhary78:UiX1Uh0my1dl5BpB@cluster0.4u12arw.mongodb.net/backend--pfe').then(()=>console.log("DB Connected"));
}