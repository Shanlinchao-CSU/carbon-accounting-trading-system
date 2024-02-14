var CarbonCoin = artifacts.require("CarbonCoin");
 
module.exports = function(deployer) {
  deployer.deploy(CarbonCoin,10000); // 设置初始发行10000个代币
};