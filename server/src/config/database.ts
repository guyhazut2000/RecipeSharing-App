import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("No MongoDB URI found in environment variables");
}

const connectToMongoDB = async () => {
  try {
    // remove error from cli
    mongoose.set("strictQuery", false);

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", (error as Error).message);
    process.exit(1);
  }
};

export default connectToMongoDB;
