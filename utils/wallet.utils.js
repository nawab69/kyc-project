"use strict";
import { BSC_RPC, ETH_RPC } from "../Constants.js";
import { decryptPrivateKey } from "./encryption.js";
import { getContract, getWeb3 } from "./provider.utils.js";
import WalletModel from "../models/Wallet.js";
import { ERC20 } from "../contracts/contracts.js";
import BigNumber from "bignumber.js";

const NETWORK = {
  ETH: "eth",
  BSC: "bnb",
};

export class Wallet {
  constructor(userId, walletPass) {
    this.userId = userId;
    this.walletPass = walletPass;
  }

  async init(network) {
    this.network = network;
    switch (network) {
      case NETWORK.ETH:
        this.web3 = await getWeb3(ETH_RPC);
        break;
      case NETWORK.BSC:
        this.web3 = await getWeb3(BSC_RPC);
        break;
      default:
        throw new Error("Invalid network");
    }
    return await this.decrypt();
  }

  async decrypt() {
    const wallet = await WalletModel.findOne({ user: this.userId });
    let account;
    switch (this.network) {
      case NETWORK.ETH:
        account = wallet.ethWallet;
        break;
      case NETWORK.BSC:
        account = wallet.bnbWallet;
        break;
      default:
        throw new Error("Invalid network");
    }
    this.address = account.address;
    this.privateKey = decryptPrivateKey(account.privateKey, this.walletPass);
    return true;
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
      console.log(this.token);
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
