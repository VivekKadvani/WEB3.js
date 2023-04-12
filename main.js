const Web3 = require("web3")
require('dotenv').config();
const { Chain, Common, Hardfork } = require("@ethereumjs/common")
var { Transaction } = require("@ethereumjs/tx")
const { Buffer } = require('buffer');

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

const url = "https://mainnet.infura.io/v3/22963a6e14064351908a374a7a08d85b"
var address = '0x00000000219ab540356cBB839Cbe05303d7705Fa'
var abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "sender", "type": "address" }, { "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "name", "type": "string" }, { "name": "symbol", "type": "string" }, { "name": "decimals", "type": "uint8" }, { "name": "totalSupply", "type": "uint256" }, { "name": "feeReceiver", "type": "address" }, { "name": "tokenOwnerAddress", "type": "address" }], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }]
var ContractAddress = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";

var w1 = new Web3(url)
const funct = async () => {
    const balance = await w1.eth.getBalance(address)
    console.log("Balance in wei :", balance)
    console.log("Balance in Ether : ", w1.utils.fromWei(balance, 'ether'))
    var contract = new w1.eth.Contract(abi, ContractAddress)
    console.log("methods :", contract.methods)
    console.log("name :", await contract.methods.name().call())
    console.log("Symbol :", await contract.methods.symbol().call())
    console.log("TotalSupply:", await contract.methods.totalSupply().call())
}
// funct()
const Balance = async () => {
    const web3 = new Web3("http://localhost:8545");
    const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const account1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    const balance = await web3.eth.getBalance(account)
    // console.log("Balance in wei :",await web3.utils.fromWei(balance,'ether'))
    console.log(await web3.eth.getBalance(account))
    console.log("default acc : ", await web3.eth.Contract.defaultBlock)
    console.log("default acc : ", await web3.eth.Contract.defaultAccount)
    await web3.eth.sendTransaction({ from: account, to: account1, value: 100 })
    // console.log("Balance in wei :",await web3.utils.fromWei(balance,'ether'))
    console.log(await web3.eth.getBalance(account))

}
// Balance()

//sendSignedTransaction
const web3 = new Web3(`${SEPOLIA_RPC_URL}`);
const account2 = '0xC9399199f40686cfacF7Ae7555Ef0DEfa0487Ebe'

const privateK1 = Buffer.from(process.env.PRIVATEK1, 'hex');
const privateK2 = Buffer.from(process.env.PRIVATEK2, 'hex')

web3.eth.getTransactionCount(account2).then((txCount) => {
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account1,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    }

    // sign transaction
    const common = new Common({ chain: Chain.Sepolia, hardfork: Hardfork.London })
    const tx = Transaction.fromTxData(txObject, { common })
    const serializedTransaction = tx.sign(privateK1).serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

    //broadcast transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) console.log(err)
        console.log("txHash : ", txHash)
    })
})
