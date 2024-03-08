const CarbonCoin = artifacts.require("CarbonCoin")
const FarmToken = artifacts.require("FarmToken")
module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const carbonCoin = await CarbonCoin.deployed()
  const farmToken = await FarmToken.deployed()
  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default. 返回被授权的账户剩余的可以代表代币持有者转账的数量，默认为0

  // 当前用户默认为账户0
  const allowanceBefore = await carbonCoin.allowance(
    accounts[0], // 授权账户
    farmToken.address // 被授权账户
  )
  console.log(
    "Amount of CarbonCoin FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )
  // In order to allow the Smart Contract to transfer to CarbonCoin (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of CarbonCoin on our behalf
  await carbonCoin.approve(farmToken.address, web3.utils.toWei("100", "ether"))
  // Validate that the farmToken can now move x amount of CarbonCoin on our behalf
  const allowanceAfter = await carbonCoin.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of CarbonCoin FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )
  // Verify accounts[0] and farmToken balance of CarbonCoin before and after the transfer
  balanceCarbonCoinBeforeAccounts0 = await carbonCoin.balanceOf(accounts[0])
  balanceCarbonCoinBeforeFarmToken = await carbonCoin.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance CarbonCoin Before accounts[0] " +
      web3.utils.fromWei(balanceCarbonCoinBeforeAccounts0.toString())
  )
  console.log(
    "Balance CarbonCoin Before TokenFarm " +
      web3.utils.fromWei(balanceCarbonCoinBeforeFarmToken.toString())
  )
  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceCarbonCoinAfterAccounts0 = await carbonCoin.balanceOf(accounts[0])
  balanceCarbonCoinAfterFarmToken = await carbonCoin.balanceOf(farmToken.address)
  console.log(
    "Balance CarbonCoin After accounts[0] " +
      web3.utils.fromWei(balanceCarbonCoinAfterAccounts0.toString())
  )
  console.log(
    "Balance CarbonCoin After TokenFarm " +
      web3.utils.fromWei(balanceCarbonCoinAfterFarmToken.toString())
  )
  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )
  // End function
  callback()
}


// 运行该脚本文件： truffle exec .\scripts\transferCarbonCoinToFarmToken.js