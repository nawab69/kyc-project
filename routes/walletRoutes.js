import express from "express";
import {
  checkBalance,
  decryptWallet,
  getAddress,
} from "../controllers/walletController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const walletRouter = express.Router();

walletRouter.get("/balance", protect, checkBalance);
walletRouter.get("/address", protect, getAddress);
walletRouter.get("/decrypt-wallet", protect, admin, decryptWallet);

export default walletRouter;
