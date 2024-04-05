const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    const report = "asdflkhasdukfjihbnasdklfnahsdjkghnadsflikgjnadklsfgjaldfkjgasldkf"

    // await carbonCredits.submitCarbonReport(report)
    // await carbonCredits.submitCarbonReport(report)

    const events = await carbonCredits.getPastEvents('ExceedRecord', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    
    console.log(events[0].returnValues); // 输出查询到的事件


    
    callback()
}


// 运行该脚本文件： truffle exec .\scripts\eventSearch.js --network cchain