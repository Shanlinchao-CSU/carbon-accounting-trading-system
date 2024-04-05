const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")

const account = "0x6be45811DC5fB8c75fB2acECa37DA4E6E202e22B"

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    await carbonCredits.submitCarbonReport(account,500,"碳排放量：500t")
    const text = await carbonCredits.reportOf(account)
    
    console.log(text);

    
    callback()
}




// 运行该脚本文件： truffle exec .\scripts\carbonReport.js