import { ETH_RPC } from "../../Constants.js";
import { getWeb3 } from "./index.js";

const initWeb3 = async () => {
  return await getWeb3(ETH_RPC);
};

export default initWeb3;
