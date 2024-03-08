const CarbonCoin = artifacts.require("CarbonCoin")
const FarmToken = artifacts.require("FarmToken")
const CarbonCredits = artifacts.require("CarbonCredits")

module.exports = async function (deployer, network, accounts) {
  // Deploy CarbonCoin
  await deployer.deploy(CarbonCoin)
  const carbonCoin = await CarbonCoin.deployed()

  // Deploy FarmToken
  await deployer.deploy(FarmToken,carbonCoin.address) // 构造函数传入CarbonCoin合约地址
  const farmToken = await FarmToken.deployed()

  // Deploy CarbonCredits
  await deployer.deploy(CarbonCredits,carbonCoin.address,accounts[0]) // 第一个账户有碳排放额发行权
  const carbonCredits = await CarbonCredits.deployed()
}