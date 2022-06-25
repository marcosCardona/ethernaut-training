# Ethernaut challenge 20 - Denial

Create a **secrets.json** file at root level with the following format:

```json
{
    "key" : "<RINKEBY WALLET SECRET>",
    "url" : "<RINKEBY PROVIDER URL>"
}
```

Run:

```shell
npx hardhat run --network rinkeby scripts/attack.js
```
