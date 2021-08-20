import mongoose from "mongoose";

const connectDB = async () => {
  let connection = process.env.DB || "mongodb://127.0.0.1:27017/testdb";
  try {
    const con = await mongoose.connect(`${connection}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDB;
