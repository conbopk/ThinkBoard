import mongoose from "mongoose";

export const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (e) {
      console.log("Error connecting to MONGODB", e);
      process.exit(1);
  }
};