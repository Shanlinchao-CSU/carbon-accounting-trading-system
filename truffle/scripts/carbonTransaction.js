const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")
module.exports = async function (callback) {
    const accounts = await new web3.eth.getAccounts()
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    // 查询第一个用户的货币
    balanceBeforeAccount0 = await carbonCoin.balanceOf(accounts[0])
    console.log(
        "Amount of account0 is "+
        web3.utils.fromWei(balanceBeforeAccount0.toString()))
    
    // 向第二个用户和第三个用户发行碳排放额度
    await carbonCredits.issueCarbonAllowance(accounts[0],accounts[1],1000)
    await carbonCredits.issueCarbonAllowance(accounts[0],accounts[2],100)
    allownance1 = await carbonCredits.allowanceOf(accounts[1])
    allownance2 = await carbonCredits.allowanceOf(accounts[2])
    console.log(
        "Amount of account1 is "+
        allownance1.toString()
    )
    console.log(
        "Amount of account2 is "+
        allownance2.toString()
    )

    // 创建交易发送碳币
    const transaction = {
        from: accounts[0],
        to: accounts[1],
        // value should be passed in wei. For easier use and to avoid mistakes,
        //	we utilize the auxiliary `toWei` function:
        value: web3.utils.toWei('1', 'ether'),
      };
    
    const transactionHash = await web3.eth.sendTransaction(transaction);
    console.log('transactionHash', transactionHash); 


    // 最新区块号
    const latestBlockNumber = await web3.eth.getBlockNumber()
    console.log("Latest block number is "+ latestBlockNumber)



    callback()
}

// 运行该脚本文件： truffle exec .\scripts\carbonTransaction.js