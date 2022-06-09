# Ethernaut challenge 13 - Gatekeeper One

Create a **secrets.json** file at root level with the following format:

```json
{
    "key" : "<RINKEBY WALLET SECRET>",
    "url" : "<RINKEBY PROVIDER URL>"
}
```

Deploy the **GatekeeperAttacker.sol** contract running:

```shell
npx hardhat run --network rinkeby scripts/gatekeeper-attacker-deployer.js
```

Replace **gatekeeperAttackerAddress** with your deployed contract address and **gateAddress** with the ethernaut's contract addy in **bruteforce-enter.js**, then run:

```shell
npx hardhat run --network rinkeby scripts/bruteforce-enter.js
```
