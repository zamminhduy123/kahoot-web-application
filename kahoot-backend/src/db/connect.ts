import mongoose from "mongoose";

const connectDB = (url: string) => {
  return mongoose.connect(url, { maxPoolSize: 15, dbName: "Kahoot" });
};

export default connectDB;
