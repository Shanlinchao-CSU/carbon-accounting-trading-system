// const Web3 = require('web3');
const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")
// const web3 = new Web3('http://119.23.143.76:8545');
// const web3 = new Web3('http://localhost:8545');

const accounts = ["0x90E672df02F2aed9A98a16324e6eE00344f6c7C3", // 0 系统
                  "0x46d9Be20C17CA09e09efC293f8e0BFc3B3efFb22", // 1 数据审核员
                  "0xd078d8bEADc71ae788f13F79F4CA6346DF2400CE"] // 2 第三方机构

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    // balanceBeforeAccount0 = await carbonCoin.balanceOf(accounts[0])
    // console.log(web3.utils.fromWei(balanceBeforeAccount0.toString()))



    // -- issue allowance
    // await carbonCredits.issueCarbonAllowance(accounts[1],1000)
    // await carbonCredits.issueCarbonAllowance(accounts[2],100)
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


    // -- transaction
    // allownanceBefore1 = await carbonCredits.allowanceOf(accounts[1])
    // allownanceBefore2 = await carbonCredits.allowanceOf(accounts[2])
    // console.log(
    //     "Allowance of account1 before is "+
    //     allownanceBefore1.toString()
    // )
    // console.log(
    //     "Allowance of account2 before is "+
    //     allownanceBefore2.toString()
    // )

    // 授权给合约地址
    // await carbonCoin.approve(carbonCredits.address, web3.utils.toWei("50", "ether"))
    // const allowanceAfter = await carbonCoin.allowance(accounts[1], carbonCredits.address)
    // console.log(
    // "Amount of CarbonCoin CarbonCredits is allowed to transfer on our behalf After: " +
    //     web3.utils.fromWei(allowanceAfter.toString())
    // )
    // await carbonCredits.carbonTransaction(accounts[2],100,web3.utils.toWei("50", "ether")) // 账户1向账户2购买100额度，价格50碳币
    

    // allownanceAfter1 = await carbonCredits.allowanceOf(accounts[1])
    // allownanceAfter2 = await carbonCredits.allowanceOf(accounts[2])
    // console.log(
    //     "Allowance of account1 after is "+
    //     allownanceAfter1.toString()
    // )
    // console.log(
    //     "Allowance of account2 after is "+
    //     allownanceAfter2.toString()
    // )


    callback()
}




// 运行该脚本文件： truffle exec .\scripts\approve.js --network cchain