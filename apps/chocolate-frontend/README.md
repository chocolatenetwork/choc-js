### Starting the contract

```bash
# Run swanky node using the dev flag 
swanky-node --dev

# Instantiate the contract 
cargo contract instantiate --constructor new --suri //Alice -x

```

### Point the frontend to the contract

* Update `CONTRACT_ADDRESS` in [`Api.ts`](./src/services/api/api.ts) with the new Contract address.

> Note: Don't forget to add tokens to your test account from [polkadot.js.org/apps](https://polkadot.js.org/apps)

```bash


# Run the frontend 
yarn nx run chocolate-frontend:serve:development
```