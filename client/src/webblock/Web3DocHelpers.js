import Web3 from "web3/dist/web3.min.js";
import Doctor from "../../../smart_contract/build/contracts/Doctor.json";

export const loadWeb3Doc = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

// if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
//   // MetaMask is installed and in use
//   const web3 = new Web3(window.ethereum || window.web3.currentProvider);

//   window.ethereum.enable().then(function() {
//     // Retrieve the current account address
//     web3.eth.getAccounts().then(function(accounts) {
//       const currentAddress = accounts[0];
//       console.log("MetaMask wallet address: ", currentAddress);
//     });
//   });
// } else {
//   console.log("MetaMask is not installed");
// }


export const loadBlockchainDataDoc = async () => {
  const web3 = new Web3(window.ethereum || window.web3.currentProvider)
  // Load account
  const accounts = await web3.eth.getAccounts();

  // Network ID

  const networkId = await web3.eth.net.getId();

  // Network data

  if (networkId) {
    console.log(networkId, Doctor.networks[5777].address)
    const auth = new web3.eth.Contract(
      Doctor.abi,
      Doctor.networks[5777].address
      );
    return { auth, accounts: accounts[0] };
  }
};
 
