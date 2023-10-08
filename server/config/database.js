import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {});
    console.log("Connected To Database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
