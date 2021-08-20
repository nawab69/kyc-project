import mongoose from "mongoose";

const WalletSchema = mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    ethWallet: {
      address: {
        type: String,
      },
      wallet: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", WalletSchema);
export default Wallet;
