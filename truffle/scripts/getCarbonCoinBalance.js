const CarbonCoin = artifacts.require("CarbonCoin")

const accounts = ["0x90E672df02F2aed9A98a16324e6eE00344f6c7C3", // 0 系统
                  "0x46d9Be20C17CA09e09efC293f8e0BFc3B3efFb22", // 1 数据审核员
                  "0x2f875a0xd078d8bEADc71ae788f13F79F4CA6346DF2400CE7c2069a7b389c24e6227755cde6494e56d"] // 2 第三方机构


module.exports = async function (callback) {
  carbonCoin = await CarbonCoin.deployed() // 获取已部署的合约的实例
  await carbonCoin.transferFrom(accounts[0],accounts[1], 100000)
  // console.log(web3.utils.fromWei(balance.toString()))
  callback()
}

// 运行该脚本文件： truffle exec .\scripts\getCarbonCoinBalance.js --network cchain
