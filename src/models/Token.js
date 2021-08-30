import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    tokenAddress: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;
