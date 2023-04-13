//here we transfer eth from one account to other account using sendSignedtransaction method
//sendSignedTransaction
require('dotenv').config();

const Web3 = require("web3");
const { Chain, Common, Hardfork } = require("@ethereumjs/common");
const { Buffer } = require('buffer');
const web3 = new Web3(`${SEPOLIA_RPC_URL}`);//sepolia url from infura
const account2 = '0xC9399199f40686cfacF7Ae7555Ef0DEfa0487Ebe';//real sepolia receiver address
const privateK1 = Buffer.from(process.env.PRIVATEK1, 'hex');//real sepolia account private key

var { Transaction } = require("@ethereumjs/tx");
web3.eth.getTransactionCount(account2).then((txCount) => {
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account1,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    }
    // sign transaction
    const common = new Common({ chain: Chain.Sepolia, hardfork: Hardfork.London });
    const tx = Transaction.fromTxData(txObject, { common });
    const serializedTransaction = tx.sign(privateK1).serialize();
    const raw = '0x' + serializedTransaction.toString('hex');
    //broadcast transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) console.log(err)
        console.log("txHash : ", txHash);
    });
});
