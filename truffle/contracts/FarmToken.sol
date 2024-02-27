pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    // using SafeMath for uint256; // As of Solidity v0.8.0, mathematical operations can be done safely without the need for SafeMath
    using SafeERC20 for IERC20;

    IERC20 public token; // MyToken的合约地址

    constructor(address _token)
        public
        ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this)); // 返回智能合约上的MyToken余额
    }

    function deposit(uint256 _amount) public {
        // Amount must be greater than zero  存款时余额必须大于0
        require(_amount > 0, "amount cannot be 0");

        // Transfer MyToken to smart contract 将指定数量代币从账户转移到合约
        token.safeTransferFrom(msg.sender, address(this), _amount);

        // Mint FarmToken to msg sender 向账户发送指定数量的FarmToken
        _mint(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) public {
        // Burn FarmTokens from msg sender 销毁账户上指定数量的代币
        _burn(msg.sender, _amount);

        // Transfer MyTokens from this smart contract to msg sender 从合约上提取指定数量的代币到账户
        token.safeTransfer(msg.sender, _amount);
    }



}