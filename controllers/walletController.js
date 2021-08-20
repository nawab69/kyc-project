import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import balance from "../utils/ethereum/balances.js";
import getWallet from "../utils/ethereum/getWallet.js";

export const checkBalance = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const wallet = await Wallet.findOne({ user: user._id });
  const bl = await balance(wallet.ethWallet.address);
  res.json({ eth: bl });
});

export const getAddress = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const wallet = await Wallet.findOne({ user: user._id });
  res.json({ eth: wallet.ethWallet.address });
});

export const decryptWallet = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const wallet = await getWallet(user._id);
  res.json(wallet);
});
