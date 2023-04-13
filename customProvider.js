//in this file we learn how to set custom proovider and call it 
const Web3 = require("web3");
const customProvider = {
    sendAsync: (payload, cb) => {
        console.log("you called custom provider");
        console.log(payload);
        cb(undefined, 100)
    }
};

// const web3 = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(customProvider)
web3.eth.getBlockNumber()
    .then(() => console.log("done dona done..."))