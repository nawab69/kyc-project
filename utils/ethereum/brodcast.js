"use strict";
import initWeb3 from ".";

const brodcast = async (rawTx) => {
  const web3 = await initWeb3();
  try {
    const recipt = await web3.eth.sendSignedTransaction(rawTx);
    return recipt;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export default brodcast;
