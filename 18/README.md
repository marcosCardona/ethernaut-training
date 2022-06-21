# Ethernaut challenge 18 - MagicNumber

Create a **secrets.json** file at root level with the following format:

```json
{
    "key" : "<RINKEBY WALLET SECRET>",
    "url" : "<RINKEBY PROVIDER URL>"
}
```

Run:

```shell
npx hardhat run --network rinkeby scripts/deploy.js
```

Lastly, call the **setSolver** function in the Ethernaut's console with the deployed contract's address.

---

*Source:*
<br>https://medium.com/coinmonks/ethernaut-lvl-19-magicnumber-walkthrough-how-to-deploy-contracts-using-raw-assembly-opcodes-c50edb0f71a2
<br>*The post has an error when pushing the 42 to the stack, it's pushing 0x42 but should be pushing 0x2a instead*