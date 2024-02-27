const CarbonCoin = artifacts.require("CarbonCoin")
const FarmToken = artifacts.require("FarmToken")
module.exports = async function (callback) {
  carbonCoin = await CarbonCoin.deployed() // 获取已部署的合约的实例
  farmToken = await FarmToken.deployed()
  balance = await carbonCoin.balanceOf(farmToken.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}

// 运行该脚本文件： truffle exec .\scripts\getCarbonCoinBalance.js
