import { getWeb3 } from ".";

const initWeb3 = async () => {
  return await getWeb3(ETH_RPC);
};

export default initWeb3;
