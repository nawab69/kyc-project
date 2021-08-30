import express from "express";
import {
  brodcast,
  checkBalance,
  decryptWallet,
  getAddress,
  transfer,
} from "../controllers/walletController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const walletRouter = express.Router();

walletRouter.get("/balance", protect, checkBalance);
walletRouter.get("/address", protect, getAddress);
walletRouter.get("/decrypt-wallet", protect, admin, decryptWallet);
walletRouter.post("/transfer/:network", protect, transfer);
walletRouter.post("/brodcast/:network", protect, brodcast);

export default walletRouter;
