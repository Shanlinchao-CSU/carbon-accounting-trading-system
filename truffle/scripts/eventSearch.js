const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    const events = await carbonCoin.getPastEvents('Transfer', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    
    console.log(events); // 输出查询到的事件

    
    callback()
}




// 运行该脚本文件： truffle exec .\scripts\eventSearch.js --network cchain