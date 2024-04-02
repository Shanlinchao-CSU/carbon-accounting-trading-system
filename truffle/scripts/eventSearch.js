const CarbonCoin = artifacts.require("CarbonCoin")
const CarbonCredits = artifacts.require("CarbonCredits")

module.exports = async function (callback) {
    const carbonCoin = await CarbonCoin.deployed()
    const carbonCredits = await CarbonCredits.deployed()

    const events = await carbonCredits.getPastEvents('CarbonTransaction', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    
    console.log(events[0].transactionHash); // 输出查询到的事件
    const transactionHash = events[0].transactionHash

    // 获取交易收据
    await web3.eth.getTransactionReceipt(transactionHash).then(async receipt => {
        if (receipt === null) {
            console.log('交易尚未完成或不存在');
            return;
        }

        // 获取交易所在的区块信息
        const blockNumber = receipt.blockNumber;
        await web3.eth.getBlock(blockNumber)
            .then(block => {
            // 获取区块的生成时间戳
            const timestamp = block.timestamp;
            // 将时间戳转换为日期对象
            const date = new Date(timestamp * 1000); // 时间戳需要乘以1000
            console.log('交易完成时间:', date);
            })
            .catch(error => {
            console.error('获取区块信息失败:', error);
            });
        })
        .catch(error => {
            console.error('获取交易收据失败:', error);
        });

    
    callback()
}




// 运行该脚本文件： truffle exec .\scripts\eventSearch.js --network cchain