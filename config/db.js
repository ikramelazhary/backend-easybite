import mongoose from "mongoose"

let isConnected = false // Cache la connexion

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing database connection")
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
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


