import mongoose from "mongoose";

const connectDB = async () => {
  let connection = process.env.DB;
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
