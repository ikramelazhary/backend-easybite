import mongoose from "mongoose"

let isConnected = false // Cache la connexion

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing database connection")
    return
  }

  try {
    await mongoose.connect(process.env.mongodb+srv:'ikramelazhary78:UiX1Uh0my1dl5BpB@cluster0.4u12arw.mongodb.net/backend--pfe', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log("✅ MongoDB Connected")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    throw error
  }
}


