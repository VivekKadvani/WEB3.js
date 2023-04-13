//in this file we learn how to interact with function of demo.sol contract and sending transaction
require('dotenv').config();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider({
    privateKeys: [process.env.PRIVATEK1],
    providerOrUrl: 'https://sepolia.infura.io/v3/22963a6e14064351908a374a7a08d85b'
});

const web3 = new Web3(provider);
const contractAddress = '0xDc7D429Ed4280c64709908552C184a8A952eDC0E';
const contractABI = [{ "inputs": [], "name": "decrement", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "show", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const senderAddress = '0xC9399199f40686cfacF7Ae7555Ef0DEfa0487Ebe';
const contract = new web3.eth.Contract(contractABI, contractAddress);
const txObject = {
    from: senderAddress,
    to: contractAddress,
    gas: web3.utils.toHex(200000), // adjust gas limit as needed
    data: contract.methods.increment().encodeABI()
};

web3.eth.sendTransaction(txObject)
    .on('transactionHash', (hash) => {
        console.log(`Transaction sent with hash: ${hash}`);
    })
    .on('receipt', (receipt) => {
        console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
    });

contract.methods.show().call((err, data) => {
    if (err)
        console.log(err)
    else
        console.log(data)
})