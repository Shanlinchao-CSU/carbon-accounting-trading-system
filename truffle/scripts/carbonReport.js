const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    await carbonCredits.submitCarbonReport("碳排放量：500t")
    const text = await carbonCredits.reportOf("0x046220c82C0127c501b47d9142B4FB10c088307B")
    
    console.log(text);

    
    callback()
}




// 运行该脚本文件： truffle exec .\scripts\carbonReport.js