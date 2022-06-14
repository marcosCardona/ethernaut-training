# Ethernaut challenge 16 - Preservation

Create a **secrets.json** file at root level with the following format:

```json
{
    "key" : "<RINKEBY WALLET SECRET>",
    "url" : "<RINKEBY PROVIDER URL>"
}
```

In **attack.js**:
- Replace **victimContractAddress** with the ethernaut's contract address.
- Replace **myPublicKey** with the address of the wallet you are playing ethernaut with.

Then run:

```shell
npx hardhat run --network rinkeby scripts/attack.js
```
