const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")

const accounts = ["0xc387a9155b36850cded153182e37f86dbf6064e3", // 0 管理员
                  "0x8b751a0226707ef8df389078b288d13a415343b7", // 1 数据审核员
                  "0x2f875a7c2069a7b389c24e6227755cde6494e56d"] // 2 第三方机构

module.exports = async function (deployer, network, accounts) {
  // Deploy CarbonCoin
  await deployer.deploy(CarbonCoin)
  const carbonCoin = await CarbonCoin.deployed()

  // Deploy CarbonCredits
  await deployer.deploy(CarbonCredits,carbonCoin.address,accounts[0],accounts[1],accounts[2])
  const carbonCredits = await CarbonCredits.deployed()
}