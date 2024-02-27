// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";

contract CarbonCredits {
    using SafeCast for uint256;

    IERC20 public carbonToken; // 碳币代币合约地址
    address public carbonIssuer; // 碳排放额发行者地址
    mapping(address => uint256) public carbonAllowance; // 每个账户的碳排放额度

    event CarbonAllowanceIssued(address account,address target, uint256 amount);
    event CarbonCreditsPublished(address account, uint256 amount);

    constructor(IERC20 _carbonToken, address _carbonIssuer) {
        carbonToken = _carbonToken;
        carbonIssuer = _carbonIssuer;
    }

    function issueCarbonAllowance(address account,address target, uint256 amount) public {
        require(msg.sender == carbonIssuer, "Only carbon issuer can issue allowance");
        carbonAllowance[target] = carbonAllowance[target] + amount;
        emit CarbonAllowanceIssued(account,target,amount);
    }

    function publishCarbonCredits(uint256 amount) public {
        require(carbonAllowance[msg.sender] >= amount, "Insufficient carbon allowance");
        carbonAllowance[msg.sender] = carbonAllowance[msg.sender] - amount;
        carbonToken.transferFrom(msg.sender, address(this), amount);
        emit CarbonCreditsPublished(msg.sender, amount);
    }
}
