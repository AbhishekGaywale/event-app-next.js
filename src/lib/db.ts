// lib/db.ts
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URI; // ✅ Correct key

if (!MONGO_URL) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
