
const { ethers } = require("hardhat");

async function main() {

  const victimAddress = '0xFC4B0890EA259ceE12dFCdB6B95aD066B9E74F3f';

  const DoubleEntryPoint = await ethers.getContractFactory("DoubleEntryPoint");
  const doubleEntryPoint = DoubleEntryPoint.attach(victimAddress);

  const Forta = await ethers.getContractFactory("Forta");
  const forta = Forta.attach(await doubleEntryPoint.forta());

  const DetectionBot = await ethers.getContractFactory("DetectionBot");
  const detectionBot = await DetectionBot.deploy(await doubleEntryPoint.cryptoVault());

  await forta.setDetectionBot(detectionBot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
