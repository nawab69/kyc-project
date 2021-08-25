import mongoose from "mongoose";

const rawtxSchema = mongoose.Schema(
  {
    txID: {
      type: String,
      unique: true,
      required: true,
    },
    network: {
      type: String,
      default: "eth",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    tx: {
      type: String,
      required: true,
    },
    isSent: {
      type: Boolean,
      deafult: false,
    },
  },
  {
    timestamps: true,
  }
);

const Rawtx = mongoose.model("Rawtx", rawtxSchema);

export default Rawtx;
