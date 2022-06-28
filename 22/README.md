# Ethernaut challenge 22 - Dex

Create a **secrets.json** file at root level with the following format:

```json
{
    "key" : "<RINKEBY WALLET SECRET>",
    "url" : "<RINKEBY PROVIDER URL>"
}
```

Replace the **victimAddress** with the Ethernaut's contract address in **attack.js**, then run:

```shell
npx hardhat run --network rinkeby scripts/attack.js
```
