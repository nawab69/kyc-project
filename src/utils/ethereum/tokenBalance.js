import BigNumber from "bignumber.js";
import { getContract, initWeb3 } from "./index.js";

const tokenBalance = async (address, tokenAddress) => {
  const web3 = await initWeb3();
  const token = await getContract(web3, ERC20, tokenAddress);
  const wei = await token.methods.balanceOf(address).call();
  const decimal = await token.methods.decimals().call();
  const Bigvalue = (wei / Math.pow(10, decimal)).toString();
  const bigNumber = BigNumber(Bigvalue);
  return bigNumber;
};

export default tokenBalance;
