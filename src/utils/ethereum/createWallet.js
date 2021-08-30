import { encryptPrivateKey } from "../Encryption.js";
import { initWeb3 } from "./index.js";
import User from "../../models/User.js";
import Wallet from "../../models/Wallet.js";
import app from "../../config/app.js";

// @ Function: Create wallet
// @ Params:  userID
const createWallet = async (userID) => {
  const web3 = await initWeb3();
  const password = app.key;
  console.log(password);
  const ethWallet = web3.eth.accounts.wallet.create(1);
  const { address } = ethWallet[0];
  const encryptWallet = JSON.stringify(
    ethWallet[0].encrypt(userID + 2021 + userID)
  );
  const finalWallet = encryptPrivateKey(encryptWallet, password);
  const user = await User.findById(userID);
  const new_wallet = await Wallet.create({
    user: user._id,
    ethWallet: { address: address, wallet: finalWallet },
  });
  console.log(new_wallet);
  return new_wallet;
};

export default createWallet;
