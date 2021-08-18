import Web3 from "web3";

const getWeb3 = (rpc) => {
  return new Promise((resolve, reject) => {
    let web3;
    try {
      web3 = new Web3(rpc);
      resolve(web3);
    } catch (e) {
      reject(e);
    }
  });
};

const getContract = async (web3, abi, address) => {
  const networkId = await web3.eth.net.getId();
  return new web3.eth.Contract(abi, address);
};

export { getWeb3, getContract };
