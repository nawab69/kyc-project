"use strict";
import { ETH_RPC } from "../../Constants.js";
import { decryptPrivateKey } from "../Encryption.js";
import WalletModel from "../../models/Wallet.js";
import { ERC20 } from "../../contracts/contracts.js";
import BigNumber from "bignumber.js";
import { getContract, getWallet, getWeb3 } from "../ethereum/index.js";
import app from "../../config/app.js";

export default class Wallet {
  constructor(userId, walletPass) {
    this.userId = userId;
    this.walletPass = walletPass;
  }

  async init() {
    this.web3 = await getWeb3(ETH_RPC);
    return this;
  }

  async decrypt() {
    const wallet = await getWallet(this.userId);
    this.address = wallet.address;
    this.privateKey = wallet.privateKey;
    return this;
  }

  async initToken(contractAddress) {
    this.token = await getContract(this.web3, ERC20, contractAddress);
    return true;
  }

  async transfer(to, amount) {
    await this.decrypt();
    const networkId = await this.web3.eth.net.getId();
    const gas = await this.web3.eth.estimateGas({
      from: this.address,
      to: to,
      amount: this.web3.utils.toWei(amount, "ether"),
    });
    const gasPrice = await this.web3.eth.getGasPrice();
    const nonce = await this.web3.eth.getTransactionCount(this.address);

    const signedTx = await this.web3.eth.accounts.signTransaction(
      {
        to: to,
        gas,
        gasPrice,
        nonce,
        chainId: networkId,
        value: this.web3.utils.toWei(amount, "ether"),
      },
      this.privateKey
    );

    return signedTx.rawTransaction;
  }

  async transferToken(to, amount) {
    if (this.token) {
      this.decrypt();
      const decimal = await this.token.methods.decimals().call();
      const Bigvalue = (amount * Math.pow(10, decimal)).toString();
      const bigNumber = BigNumber(Bigvalue);
      const value = bigNumber.toFixed();

      const tx = await this.token.methods.transfer(to, value);
      const gas = await tx.estimateGas({ from: this.address });
      const gasPrice = await this.web3.eth.getGasPrice();
      const data = tx.encodeABI();
      const nonce = await this.web3.eth.getTransactionCount(this.address);

      const signedTx = await this.web3.eth.accounts.signTransaction(
        {
          to: this.token.options.address,
          data,
          gas,
          gasPrice,
          nonce,
        },
        this.privateKey
      );
      return signedTx.rawTransaction;
    } else {
      throw new Error("Token not intialize");
    }
  }
}
