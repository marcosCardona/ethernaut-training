# Ethernaut challenge 15 - Naught Coin

You will need an extra wallet for this challenge. The goal is to approve your extra wallet to withdraw your tokens, and then call the transferFrom trough the script.

Call the following function in the Ethernaut's console:

```shell
contract.approve('<2nd wallet address>', '1000000000000000000000000');
```

Create a **secrets.json** file at root level with the following format:

```json
{
    "key" : "<RINKEBY WALLET SECRET (2nd wallet address private key)>",
    "url" : "<RINKEBY PROVIDER URL>"
}
```

In **attack.js**:
- Replace **naughtCoinAddress** with the ethernaut's contract address.
- Replace **transferFromAddress** with the address of the wallet you are playing ethernaut with.
- Replace **transferToAddress** with your 2nd wallet address.

Then run:

```shell
npx hardhat run --network rinkeby scripts/attack.js
```
