import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGODB_URI } = process.env;

export const connectDatabase = async () => {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};
