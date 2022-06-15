# Ethernaut challenge 17 - Recovery

Create a **secrets.json** file at root level with the following format:

```json
{
    "key" : "<RINKEBY WALLET SECRET>",
    "url" : "<RINKEBY PROVIDER URL>"
}
```

In **attack.js**:
- Replace **victimContractAddress** with the SimpleToken's contract address (I looked it up at rinkeby.etherscan.io).
- Replace **myPublicKey** with the address of the wallet you are playing ethernaut with.

Then run:

```shell
npx hardhat run --network rinkeby scripts/attack.js
```
