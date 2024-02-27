pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CarbonCoin is ERC20 {
    constructor() public ERC20("CarbonCoin", "CC"){ // 设置名称和符号参数
        _mint(msg.sender, 1000000000000000000000000); //ERC代币默认使用18位小数，此处发行100万个代币
    }
}
