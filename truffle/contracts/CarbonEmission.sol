pragma solidity ^0.8.0;

contract CarbonEmission {
    struct CarbonReport {
        string reportText;
    }

    mapping(address => uint256) public carbonCredits;
    mapping(address => CarbonReport) public carbonReports;

    function addCarbonCredits(address user, uint256 credits) public {
        carbonCredits[user] += credits;
    }

    function submitCarbonReport(string memory report) public {
        carbonReports[msg.sender] = CarbonReport(report);
    }
}
