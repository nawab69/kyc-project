import connectDB from "../../connectDB.js";
import { peopleFutureAbi } from "../../contracts/peopleFuture.js";
import Wallet from "../../models/Wallet.js";
import initWeb3 from "../ethereum/initWeb3.js";
import { getContract } from "../ethereum/provider.js";
import dotenv from "dotenv";
import getWallet from "../ethereum/getWallet.js";
import brodcast from "../ethereum/brodcast.js";
dotenv.config();

const db = await connectDB();

export class PeopleFuture {
  // ------------------------------------------------------------------------
  // 1. PeopleFuture class Constructor
  // ------------------------------------------------------------------------

  constructor(userId) {
    this.userId = userId;
  }

  // ------------------------------------------------------------------------
  // 2. Initialize Wallet , web3 & contract Instance
  // ------------------------------------------------------------------------

  async init() {
    this.wallet = await getWallet(this.userId);
    this.web3 = await initWeb3();
    this.contract = await getContract(
      this.web3,
      peopleFutureAbi,
      "0xb5D42B8383753DDBCc19B0e41D4E03fFE93acC63"
    );
  }

  // ------------------------------------------------------------------------
  // 3. Initialize a new escrow Contract
  // ------------------------------------------------------------------------
  async initializeNewContract(
    sponsor,
    prospect,
    prompti,
    totalPayment,
    escrowPayment,
    feePercent,
    numberOfYears,
    firstYear,
    projectedEarnings,
    baseEscrowBalance
  ) {
    // ------------------------------------------------------------------------
    // 3.1. Validate Params
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // 3.2. Create Transaction
    // ------------------------------------------------------------------------

    const tx = await this.contract.methods.initializeNewContract(
      sponsor,
      prospect,
      prompti,
      totalPayment,
      escrowPayment,
      feePercent,
      numberOfYears,
      firstYear,
      projectedEarnings,
      baseEscrowBalance
    );
    return this.tnxSignConstructor(
      tx,
      "0xb5D42B8383753DDBCc19B0e41D4E03fFE93acC63"
    );
  }

  // ------------------------------------------------------------------------
  // 4. Initialize Values
  // ------------------------------------------------------------------------

  async initializeValues(
    contractId,
    tierOnePercent,
    tierTwoPercent,
    tierThreePercent,
    tierTwoMinimum,
    tierThreeMinimum,
    minimumPayout
  ) {
    // ------------------------------------------------------------------------
    // 4.1. Validate Params
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // 4.2. Create Transaction
    // ------------------------------------------------------------------------

    const tx = await this.contract.methods.initializeValues(
      contractId,
      tierOnePercent,
      tierTwoPercent,
      tierThreePercent,
      tierTwoMinimum,
      tierThreeMinimum,
      minimumPayout
    );

    return this.tnxSignConstructor(
      tx,
      "0xb5D42B8383753DDBCc19B0e41D4E03fFE93acC63"
    );
  }

  // ------------------------------------------------------------------------
  // 5. Initial Payment
  // ------------------------------------------------------------------------

  async initialPayment(contractId, value) {
    // ------------------------------------------------------------------------
    // 5.1. Validate Params
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // 5.2. Create Transaction
    // ------------------------------------------------------------------------

    const tx = await this.contract.methods.initialPayment(contractId);
    this.value = value;

    return this.tnxSignConstructor(
      tx,
      "0xb5D42B8383753DDBCc19B0e41D4E03fFE93acC63"
    );
  }

  // ------------------------------------------------------------------------
  // 6. Report earnings
  // ------------------------------------------------------------------------

  async reportEarnings(contractId, earnings) {
    // ------------------------------------------------------------------------
    // 6.1. Validate Params
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // 6.2. Create Transaction
    // ------------------------------------------------------------------------

    const tx = await this.contract.methods.reportEarnings(contractId, earnings);

    return this.tnxSignConstructor(
      tx,
      "0xb5D42B8383753DDBCc19B0e41D4E03fFE93acC63"
    );
  }

  // ------------------------------------------------------------------------
  // 7. Verify Earnings Report
  // ------------------------------------------------------------------------

  async verifyEarningsReport(contractId, earnings) {
    // ------------------------------------------------------------------------
    // 7.1. Validate Params
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // 7.2. Create Transaction
    // ------------------------------------------------------------------------

    const tx = await this.contract.methods.verifyEarningsReport(
      contractId,
      earnings
    );

    return this.tnxSignConstructor(
      tx,
      "0xb5D42B8383753DDBCc19B0e41D4E03fFE93acC63"
    );
  }

  // ------------------------------------------------------------------------
  // 7. pay Portion Of Earnings
  // ------------------------------------------------------------------------

  async payPortionOfEarnings(contractId, payout) {
    // ------------------------------------------------------------------------
    // 7.1. Validate Params
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // 7.2. Create Transaction
    // ------------------------------------------------------------------------

    const tx = await this.contract.methods.payPortionOfEarnings(contractId);
    this.value = payout;

    return this.tnxSignConstructor(
      tx,
      "0xb5D42B8383753DDBCc19B0e41D4E03fFE93acC63"
    );
  }

  async tnxSignConstructor(tx, to) {
    const gas = await tx.estimateGas({
      from: this.wallet.address,
      to: to,
    });

    const gasPrice = await this.web3.eth.getGasPrice();

    console.log("Gas", gas);
    console.log("Gas Price", gasPrice);

    const data = tx.encodeABI();
    const nonce = await this.web3.eth.getTransactionCount(this.wallet.address);

    // Sign Transaction

    const signedTx = await this.web3.eth.accounts.signTransaction(
      {
        to: to,
        data,
        gas,
        gasPrice,
        nonce,
        value: this.value,
      },
      this.wallet.privateKey
    );
    const signed = signedTx.rawTransaction;

    console.log("Raw TX", signed);

    // Brodcast Transaction

    const result = await brodcast(signed);

    // return Transaction
    return result;
  }

  static getTotalPayment(contractId) {
    (async () => {
      try {
        const web3 = await initWeb3();
        const contract = await getContract(
          web3,
          peopleFutureAbi,
          "0xb5D42B8383753DDBCc19B0e41D4E03fFE93acC63"
        );

        const totalPayment = await contract.methods
          .getTotalPayment(contractId)
          .call();

        return totalPayment;
      } catch (e) {}
    })();
  }
}

// const pp = new PeopleFuture("6114dfd07435cd082607cf8e");
// await pp.init();

// console.log(
//   await pp.initializeNewContract(
//     "0xfb4428cf772c560b7c66b254ad6beb7cf4abfea4",
//     "0xDfc3352c34e9Aec16Cb32f97Be1596Ced91FE5bd",
//     "0xa530CCE57D94725c0EC2Af5E04391269EbA19481",
//     "10000000000000000000000",
//     "10000000000000000000000",
//     "2",
//     "5",
//     "2020",
// [
//   "1000000000000000000000000",
//   "1000000000000000000000000",
//   "1000000000000000000000000",
//   "1000000000000000000000000",
//   "1000000000000000000000000",
// ],
// [
//   "10000000000000000000000",
//   "1000000000000000000000000",
//   "1000000000000000000000000",
//   "1000000000000000000000000",
//   "1000000000000000000000000",
// ]
//   )
// );

// console.log(
//   await pp.initializeValues(
//     "2",
//     "4",
//     "7",
//     "10",
//     "1000000000000000",
//     "5000000000000",
//     "500000000000"
//   )
// );
