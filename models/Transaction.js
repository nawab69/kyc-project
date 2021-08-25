import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  receipt: {
    type: String,
  },
  success: {
    type: Boolean,
    required: true,
  },
  network: {
    type: String,
  },
  error: {
    type: String,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
