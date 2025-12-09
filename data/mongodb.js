"use server";

import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing in .env.local");
  }

  if (mongoose.connection.readyState !== 0) {
    return; // Already connected
  }

  try {
    await mongoose.connect(uri);  // No options in Mongoose v7+
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
