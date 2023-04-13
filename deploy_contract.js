//deploy contract using web3 in local
fs = require("fs")
Web3 = require("web3")

let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));
let filecontent = fs.readFileSync("./contracts/demo.sol").toString();
ABI = [
    {
        "inputs": [],
        "name": "decrement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "show",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

bytecode = "608060405234801561001057600080fd5b506101bd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632baeceb714610046578063cc80f6f314610050578063d09de08a1461006e575b600080fd5b61004e610078565b005b610058610091565b60405161006591906100cc565b60405180910390f35b61007661009a565b005b60008081548092919061008a90610116565b9190505550565b60008054905090565b6000808154809291906100ac9061013f565b9190505550565b6000819050919050565b6100c6816100b3565b82525050565b60006020820190506100e160008301846100bd565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610121826100b3565b915060008203610134576101336100e7565b5b600182039050919050565b600061014a826100b3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361017c5761017b6100e7565b5b60018201905091905056fea26469706673582212209072ae765429cd6ce7b06b256115e9af8b386908ad30f08b2cf900bb3c31490264736f6c63430008120033"

contract = new web3.eth.Contract(ABI);
web3.eth.getAccounts().then((accounts) => {
    console.log("accounts: ", accounts);
    defaultAccount = accounts[0];
    contract.deploy({ data: bytecode })
        .send({ from: defaultAccount, gas: 5000000 })
        .on("receipt", (receipt) => {
            console.log("contract address:", receipt.contractAddress);
        }).then((demoContract) => {
            demoContract.methods.show().call((err, data) => {

                console.log("initial value:", data)
            })

        })
})