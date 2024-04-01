const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")
module.exports = async function (callback) {
    const accounts = await web3.eth.getAccounts()
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()
    

    // 基本测试操作
    web3.eth.getBalance(accounts[0], (error, balance) => {
        if (!error) {
            console.log(`账户 ${accounts[0]} 的余额为 ${web3.utils.fromWei(balance, 'ether')} ETH`);
        } else {
            console.error(error);
        }
    });
    

    // 查询第一个用户的货币
    balanceBeforeAccount0 = await carbonCoin.balanceOf(accounts[0])
    console.log(
        "Amount of account0 Before is "+
        web3.utils.fromWei(balanceBeforeAccount0.toString()))
    
    // 向第二个用户和第三个用户发行碳排放额度
    await carbonCredits.issueCarbonAllowance(accounts[1],1000)
    await carbonCredits.issueCarbonAllowance(accounts[2],100)
    allownance1 = await carbonCredits.allowanceOf(accounts[1])
    allownance2 = await carbonCredits.allowanceOf(accounts[2])
    console.log(
        "Allowance of account1 is "+
        allownance1.toString()
    )
    console.log(
        "Allowance of account2 is "+
        allownance2.toString()
    )

    // 最新区块号
    const latestBlockNumber = await web3.eth.getBlockNumber()
    console.log("Latest block number is "+ latestBlockNumber)


    // 查询转账前碳币
    balanceBeforeAccount0 = await carbonCoin.balanceOf(accounts[0])
    balanceBeforeAccount1 = await carbonCoin.balanceOf(accounts[1])
    balanceBeforeAccount2 = await carbonCoin.balanceOf(accounts[2])
 
    console.log(
        "Amount of account0 before is "+
        web3.utils.fromWei(balanceBeforeAccount0.toString())
    )
    console.log(
        "Amount of account1 before is "+
        web3.utils.fromWei(balanceBeforeAccount1.toString())
    )
    console.log(
        "Amount of account2 before is "+
        web3.utils.fromWei(balanceBeforeAccount2.toString())
    )


    // 发送碳币
    await carbonCoin.transfer(accounts[1],web3.utils.toWei("50", "ether"))
    await carbonCoin.transfer(accounts[2],web3.utils.toWei("200", "ether"))

    // 查询转账后碳币
    balanceAfterAccount0 = await carbonCoin.balanceOf(accounts[0])
    balanceAfterAccount1 = await carbonCoin.balanceOf(accounts[1])
    balanceAfterAccount2 = await carbonCoin.balanceOf(accounts[2])
 
    console.log(
        "Amount of account0 after is "+
        web3.utils.fromWei(balanceAfterAccount0.toString())
    )
    console.log(
        "Amount of account1 after is "+
        web3.utils.fromWei(balanceAfterAccount1.toString())
    )
    console.log(
        "Amount of account2 after is "+
        web3.utils.fromWei(balanceAfterAccount2.toString())
    )

    // 碳交易
    allownanceBefore1 = await carbonCredits.allowanceOf(accounts[1])
    allownanceBefore2 = await carbonCredits.allowanceOf(accounts[2])
    console.log(
        "Allowance of account1 before is "+
        allownanceBefore1.toString()
    )
    console.log(
        "Allowance of account2 before is "+
        allownanceBefore2.toString()
    )


    // 授权给合约地址
    await carbonCoin.approve(carbonCredits.address, web3.utils.toWei("50", "ether"))
    const allowanceAfter = await carbonCoin.allowance(accounts[1], carbonCredits.address)
    console.log(
    "Amount of CarbonCoin CarbonCredits is allowed to transfer on our behalf After: " +
        web3.utils.toWei(allowanceAfter.toString())
    )


    await carbonCredits.carbonTransaction(accounts[2],100,web3.utils.toWei("50", "ether")) // 账户1向账户2购买100额度，价格50碳币
    
    allownanceAfter1 = await carbonCredits.allowanceOf(accounts[1])
    allownanceAfter2 = await carbonCredits.allowanceOf(accounts[2])
    console.log(
        "Allowance of account1 after is "+
        allownanceAfter1.toString()
    )
    console.log(
        "Allowance of account2 after is "+
        allownanceAfter2.toString()
    )
    



    callback()
}

// 运行该脚本文件： truffle exec .\scripts\carbonTransaction.js --network cchain