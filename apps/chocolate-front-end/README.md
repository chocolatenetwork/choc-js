# Chocolate frontend app

## Run the app

```bash

# Install all deps at the root of the repo
yarn install

# Run the app

yarn nx serve chocolate-front-end

# Should be hosted at http://127.0.0.1:4200 -- Use ip addr to avoid cors errors with local ipfs.
```
## Seed the chain


```bash
# Run the seed script 
yarn nx run chocolate-front-end:seed
```