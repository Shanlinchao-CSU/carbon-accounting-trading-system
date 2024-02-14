// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CarbonCoin.sol";

contract TestCarbonCoin {
    CarbonCoin carbonCoin = CarbonCoin(DeployedAddresses.CarbonCoin());
    address owner;

    function testInitialBalanceWithNewCarbonCoin() public {
        uint expected = 10000 * 10**18;
        Assert.equal(carbonCoin.totalSupply(), expected, "Total supply should be 10000 tokens initially");
    }

    function testAirDrop() public {
        address account1 = address(0x01);
        uint amount = 5 * 10**18;
        
        carbonCoin.airDrop(account1, amount);
        
        Assert.equal(carbonCoin.balanceOf(account1), amount, "Account1 should have received 5 tokens");
        Assert.equal(carbonCoin.totalSupply(), 10005 * 10**18, "Total supply should have increased by 10005 tokens");
    }

    // function testTransfer() public {
    //     address account1 = address(0x01);
    //     address account2 = address(0x02);
    //     uint amount = 4 * 10**18;

    //     carbonCoin.transfer(account2, amount);

    //     Assert.equal(carbonCoin.balanceOf(account1), 1 * 10**18, "Account1 balance should decrease by 4 tokens");
    //     Assert.equal(carbonCoin.balanceOf(account2), amount, "Account2 balance should increase by 4 tokens");
    // }

    // function testApproveAndTransferFrom() public {
    //     address account1 = address(0x01);
    //     address account2 = address(0x02);
    //     address account3 = address(0x03);
    //     uint amount = 500 * 10**18;

    //     carbonCoin.approve(account2, amount);
    //     carbonCoin.transferFrom(account1, account3, amount, {from: account2});

    //     Assert.equal(carbonCoin.balanceOf(account1), 48500 * 10**18, "Account1 balance should decrease by 500 tokens");
    //     Assert.equal(carbonCoin.balanceOf(account3), amount, "Account3 balance should increase by 500 tokens");
    // }
}
