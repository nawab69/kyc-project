import { decryptPrivateKey } from "../Encryption.js";
import { initWeb3 } from "./index.js";
import Wallet from "../../models/Wallet.js";
import app from "../../config/app.js";
import connectDB from "../../connectDB.js";

connectDB();

// @ Function: get wallet
// @ Params:  userID
const getWallet = async (userID) => {
  const web3 = await initWeb3();
  const password = app.key;
  const dbWallet = await Wallet.findOne({ user: userID });
  const { wallet } = dbWallet.ethWallet;
  const decryptedWallet = decryptPrivateKey(wallet, password);
  const finalWallet = web3.eth.accounts.wallet.decrypt(
    [decryptedWallet],
    userID + 2021 + userID
  );
  return finalWallet[0];
};

export default getWallet;
