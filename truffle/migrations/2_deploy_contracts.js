const CarbonCoin = artifacts.require("CarbonCoin")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy CarbonCoin
  await deployer.deploy(CarbonCoin)
  const carbonCoin = await CarbonCoin.deployed()

  // Deploy FarmToken
  await deployer.deploy(FarmToken,carbonCoin.address)
  const farmToken = await FarmToken.deployed()
}