"use strict";
import { initWeb3 } from "./index.js";

const balance = async (address) => {
  const web3 = await initWeb3();
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, "ether");
};

export default balance;
