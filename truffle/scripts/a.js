// const Web3 = require('web3');
const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")
// const web3 = new Web3('http://119.23.143.76:8545');
// const web3 = new Web3('http://localhost:8545');

const accounts = ["0xfE9873C13D2e643FFD5135868b40524C1cd7b4fb",
                  "0x9D7148a5fD954B3ae709B17D0E437EedFF5D8b07",
                  "0xdC232902604206C38cb64f4144934a02FA4470D3"]

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    balanceBeforeAccount0 = await carbonCoin.balanceOf(accounts[0])
    console.log(web3.utils.fromWei(balanceBeforeAccount0.toString()))


    // -- transaction
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

    await carbonCredits.carbonTransaction(accounts[2],100,50) // 账户1向账户2购买100额度，价格50碳币
    // await carbonCoin.transfer(accounts[1],web3.utils.toWei("100", 'ether'), { from: accounts[0y] })

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



    // -- transfer
    // const carbonCoin = await CarbonCoin.deployed()
    // await carbonCoin.transfer("0x0e9756954Fd80fB81284f1F66aCeda962732ffDD",web3.utils.toWei("100", "ether"), { from: "0xfe9873c13d2e643ffd5135868b40524c1cd7b4fb" })

    callback()
}




// 运行该脚本文件： truffle exec .\scripts\a.js --network cchain