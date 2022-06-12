const hre = require("hardhat");

async function main() {
    const gateAddress = '0x493E89A6Bb933b290fA8D572e128871213567b03';

    const GatekeeperAttacker = await hre.ethers.getContractFactory("GatekeeperAttacker");
    const gatekeeperAttacker = await GatekeeperAttacker.deploy(gateAddress);

    await gatekeeperAttacker.deployed();

    console.log("GatekeeperAttacker deployed to:", gatekeeperAttacker.address);
    console.log("Successful attack!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
