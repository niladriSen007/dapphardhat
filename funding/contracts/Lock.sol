// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
 import "../node_modules/hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    string public  greeting;
    address payable public owner;


    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime,string memory _greeting) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        greeting = _greeting;
        owner = payable(msg.sender);
    }
    
    function greet() public  view returns (string memory)
    {
        return greeting;
    }



    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
