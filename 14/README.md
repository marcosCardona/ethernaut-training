# Ethernaut challenge 14 - Gatekeeper Two

Create a **secrets.json** file at root level with the following format:

```json
{
    "key" : "<RINKEBY WALLET SECRET>",
    "url" : "<RINKEBY PROVIDER URL>"
}
```

Replace **gateAddress** with the ethernaut's contract address in **enter.js**, then run:

```shell
npx hardhat run --network rinkeby scripts/enter.js
```
