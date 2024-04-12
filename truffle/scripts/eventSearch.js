const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")

const testAccount = "0x1BbC291855D576E335f1C0C2AF71a15ddFe6751E"

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    const report = "{\"rec_cap_arr\":[0],\"rec_pra_arr\":[0]}"

    await carbonCredits.submitCarbonReport(testAccount,500,report)
    // await carbonCredits.submitCarbonReport(report)
    // const amount = await carbonCredits.allowanceOf(testAccount)
    // console.log(amount)

    // const events = await carbonCredits.getPastEvents('CarbonReportSubmitted', {
    //     fromBlock: 0,
    //     toBlock: 'latest'
    // });
    
    // console.log(events); // 输出查询到的事件


    
    callback()
}


// 运行该脚本文件： truffle exec .\scripts\eventSearch.js --network cchain