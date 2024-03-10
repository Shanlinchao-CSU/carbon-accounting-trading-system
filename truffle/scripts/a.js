const Web3 = require('web3');
const CarbonCoin = artifacts.require("CarbonCoin")
// const web3 = new Web3('http://119.23.143.76:8545'); // 连接ganache-cli的RPC地址

// const web3 = new Web3('http://localhost:8545');

module.exports = async function (callback,accounts) {
    //-- get account
    // const accounts = await web3.eth.getAccounts()
    // console.log(accounts)


    //-- new account
    // const account = await web3.eth.accounts.create();
    // console.log('New Account Created:');
    // console.log('Address:', account.address);
    // console.log('Private Key:', account.privateKey);


    // -- transfer
    const carbonCoin = await CarbonCoin.deployed()
    await carbonCoin.transfer("0x40fa69aeA0A7e5DF979374837281b239e6C3AFBB",web3.utils.toWei("100", "ether"), { from: "0xfe9873c13d2e643ffd5135868b40524c1cd7b4fb" })

    callback()
}


// async function createNewAccount() {
// const account = await web3.eth.accounts.create();
// console.log('New Account Created:');
// console.log('Address:', account.address);
// console.log('Private Key:', account.privateKey);
// }

// async function searchAccount(){
//   const accounts = await web3.eth.getAccounts()
//   console.log(accounts)
// }

// createNewAccount();
// searchAccount();


// 运行该脚本文件： truffle exec .\scripts\a.js