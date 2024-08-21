import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default connectDB;
