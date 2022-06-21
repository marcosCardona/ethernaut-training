
const { ethers } = require("hardhat");

async function main() {
  // Initialization opcodes
  // 600a     s: PUSH1 0x0a (10 bytes)
  // 600c     f: PUSH1 0x0c (current position of runtime opcodes, f starts after initialization opcodes end, so 12 bytes or 0c in hex)
  // 6000     t: PUSH1 0x00 (destination memory index 0)
  // 39       CODECOPY(t, f, s)
  // 600a     s: PUSH1 0x0a (runtime opcode length)
  // 6000     p: PUSH1 0x00 (access memory index 0)
  // f3       RETURN(p, s) (return to EVM)

  // Resulting initialization opcode sequence is 600a600c600039600a6000f3


  // Runtime opcodes
  // 602a     v: PUSH1 0x2a (value is 42)
  // 6080     p: PUSH1 0x80 (memory slot is 0x80, randomly chosen)
  // 52       MSTORE(p, v)
  // 6020     s: PUSH1 0x20 (value is 32 bytes in size)
  // 6080     p: PUSH1 0x80 (value was stored in slot 0x80)
  // f3       RETURN(p, s)

  // Resulting runtime opcode sequence is 602a60805260206080f3 (10 opcodes and 10 bytes long, or 0x0a in hex)

  // Final sequence is 0x600a600c600039600a6000f3602a60805260206080f3
  // first 12 bytes are initialization opcodes and the subsequent 10 bytes are your runtime opcodes

  const signers = await ethers.getSigners();
  const bytecode = "0x600a600c600039600a6000f3602a60805260206080f3";

  const tx = await signers[0].sendTransaction({ data: bytecode });
  
  const receipt = await tx.wait();

  console.log("Contract deployed to:", receipt.contractAddress)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
