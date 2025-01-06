import mongoose from "mongoose";

const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? "mongodb://127.0.0.1:27017/smart-parking"
    : process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const connectDB = async () => {
  try {
    mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to mongoDB successfully");
    });
  } catch (error) {
    console.log("Failed to connect to mongoDB " + error);
    process.exit(0);
  }
};

export default connectDB;
