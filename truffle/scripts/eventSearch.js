const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")

const testAccount = "0x0e9756954Fd80fB81284f1F66aCeda962732ffDD"

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    const report = "asdflkhasdukfjihbnasdklfnahsdjkghnadsflikgjnadklsfgjaldfkjgasldkf"

    await carbonCredits.submitCarbonReport(testAccount,500,report)
    // await carbonCredits.submitCarbonReport(report)
    // const amount = await carbonCredits.allowanceOf(testAccount)
    // console.log(amount)

    const events = await carbonCredits.getPastEvents('CarbonReportSubmitted', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    
    console.log(events); // 输出查询到的事件


    
    callback()
}


// 运行该脚本文件： truffle exec .\scripts\eventSearch.js --network cchain