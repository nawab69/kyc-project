import expressAsyncHandler from "express-async-handler";
import Rawtx from "../models/Rawtx.js";
import Token from "../models/Token.js";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import balance from "../utils/ethereum/balances.js";
import getWallet from "../utils/ethereum/getWallet.js";
import EthWallet from "../utils/wallet/index.js";
import { uuid } from "uuidv4";
import brodcastTransaction from "../utils/ethereum/brodcast.js";
import Transaction from "../models/Transaction.js";

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

export const transfer = expressAsyncHandler(async (req, res) => {
  // get logged in user
  const user = req.user;
  // get params
  const { network } = req.params;

  // get request body
  const { currency, amount, to } = req.body;
  if (!currency || !amount || !to) {
    throw new Error("Please input All fields");
  }

  if (network != "eth") {
    throw new Error("Network error");
  }
  const wallet = new EthWallet(user._id);
  await wallet.init();
  let rawTx;

  // create Raw Transaction

  if (currency === "eth") {
    rawTx = await wallet.transfer(to, amount);
  } else {
    const token = await Token.findOne({ symbol: "currency" });
    if (!token) {
      throw new Error("Token not found");
    }
    await wallet.initToken(contractAddress);
    rawTx = await wallet.transferToken(to, amount);
  }

  // Store Raw Transaction

  const RawTx = new Rawtx();
  RawTx.network = network;
  RawTx.user = user._id;
  RawTx.tx = rawTx;
  RawTx.txID = uuid();
  await RawTx.save();

  // Response raw Transaction

  res.json({
    type: "transactionCreated",
    txID: RawTx.txID,
  });
});

export const brodcast = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { network } = req.params;
  const { txID } = req.body;

  if (!network || !txID) {
    throw new Error("Something went wrong");
  }
  const rawTX = await Rawtx.findOne({ txID: txID });

  try {
    const receipt = await brodcastTransaction(rawTX.tx);
    await Transaction.create({
      network: "eth",
      receipt: JSON.stringify(receipt),
      success: true,
    });
    res.json({
      success: true,
      message: "Transaction Successfull",
      data: { receipt },
    });
  } catch (error) {
    await Transaction.create({
      network: "eth",
      error: JSON.stringify(error.message),
      success: false,
    });
    res.json({
      success: false,
      message: "Transaction Failed",
      data: error.message,
    });
  }
});

export const fetchTransaction = expressAsyncHandler(async (req, res) => {
  const { type } = req.params;
});
