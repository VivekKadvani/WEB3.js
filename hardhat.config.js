/** @type import('hardhat/config').HardhatUserConfig */
const { config } = require('dotenv');
const ACCOUNT_PRIVATE_KEY=process.env.ACCOUNT_PRIVATE_KEY;
const SEPOLIA_RPC_URL= process.env.SEPOLIA_RPC_URL;
const ALCHEMY_API_KEY=process.env.ALCHEMY_API_KEY;
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY;
module.exports = {
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${ACCOUNT_PRIVATE_KEY}`],
      gas: 'auto',
      
    }
  },
};
