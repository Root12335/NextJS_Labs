import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nextjs-day2", {
      serverSelectionTimeoutMS: 3000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new Error("Failed to connect to database");
  }
};

export default connectDB;
