### Dependency tracking file.

So as to ensure that updates are easier to do in this repository, dependencies are tracked here based on groups that are related.

### NX

    @nrwl/cli@14.4.0,
    @nrwl/js@14.4.0,
    @nrwl/nx-cloud@latest,
    @nrwl/workspace@14.4.0,
    "@nrwl/jest"@^14.4.0,
    nx@14.4.0,
    @nrwl/react@14.4.0
    @nrwl/cypress@14.4.0",
    @nrwl/eslint-plugin-nx@14.4.0,
    @nrwl/linter@14.4.0,
    @nrwl/web@14.4.0,
    @nrwl/devkit@14.4.0

### Lint

    prettier@^2.6.2,
    "@typescript-eslint/eslint-plugin@^5.29.0",
    "@typescript-eslint/parser@^5.29.0",
    "eslint@~8.15.0",
    "eslint-config-prettier@8.1.0",
    "eslint-plugin-cypress@^2.10.3",
    "eslint-plugin-import@2.26.0",
    "eslint-plugin-jsx-a11y@6.6.0",
    "eslint-plugin-react@7.30.1",
    "eslint-plugin-react-hooks@4.6.0",

### Ts

    esno@^0.16.3
    typescript@~4.7.2
    @types/node@^16.11.1

### Jest

    tslib@2.3.0
    @types/jest@27.4.1
    jest@27.5.1
    ts-jest@27.1.4
    ts-node@~10.8.0

### Babel

    "regenerator-runtime": "0.13.7",
    core-js@^3.6.5,

### React

    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "6.3.0",
    "@types/react": "18.0.14",
    "@types/react-dom": "18.0.5",
    "@types/react-router-dom": "5.3.3",

### Cypress / Testing

    "@testing-library/react": "13.3.0",
    "cypress": "^9.1.0",
    "react-test-renderer": "18.2.0",

### Polkadot

```log
<!-- Devhub at https://github.com/substrate-developer-hub/substrate-front-end-template/commit/e36c75de93a8fbd6a40b374129fbfa50a2bff16d -->
    @polkadot/api@^7.10.1
    @polkadot/extension-dapp@^0.42.7
    @polkadot/keyring@^8.4.1
    @polkadot/networks@^8.4.1
    @polkadot/types@^7.10.1
    @polkadot/ui-keyring@^1.1.1
    @polkadot/ui-settings@^1.1.1
    @polkadot/util@^8.4.1
    @polkadot/util-crypto@^8.4.1

    node-polyfill-webpack-plugin@2.0.1
    stream-browserify@^3.0.0
```

```log
<!-- Ours at Aug 20th 2022 -->
    @polkadot/api@^9.1.1
    @polkadot/keyring@^10.1.3
    @polkadot/types@^9.1.1
    @polkadot/typegen@9.1.1
    @polkadot/ui-keyring@2.9.4
    ->   @polkadot/ui-settings@2.9.4
        ->    @polkadot/networks@10.1.3

    @polkadot/util@^10.1.3
    @polkadot/util-crypto@^10.1.3

    @open-web3/orml-type-definitions@2.0.1
    @polkadot/extension-dapp@^0.44.6, - passto managing extss
```

```log
   <!-- Polkadot api at https://github.com/polkadot-js/api/commit/f0c45733eef590e785ff13ba701a6f0dcae05dc1  -->
    <!-- "@polkadot/api-augment": "^9.1.1", -->
    <!-- "@polkadot/api-base": "^9.1.1", -->
    <!-- "@polkadot/api-contract": "^9.1.1", -->
    <!-- "@polkadot/api-derive": "^9.1.1", -->
    <!-- "@polkadot/hw-ledger": "^10.1.3", -->
    <!-- "@polkadot/networks": "^10.1.3", -->
    <!-- "@polkadot/phishing": "^0.18.2", -->
    <!-- "@polkadot/rpc-augment": "^9.1.1", -->
    <!-- "@polkadot/rpc-core": "^9.1.1", -->
    <!-- "@polkadot/rpc-provider": "^9.1.1", -->
    <!-- "@polkadot/types-augment": "^9.1.1", -->
    <!-- "@polkadot/types-codec": "^9.1.1", -->
    <!-- "@polkadot/types-create": "^9.1.1", -->
    <!-- "@polkadot/types-known": "^9.1.1", -->
    <!-- "@polkadot/types-support": "^9.1.1", -->
    "@polkadot/wasm-crypto": "^6.3.1",
```

#### Browser

### Projects

#### Schema

    typescript-json-schema@^0.53.1
    json-stable-stringify@^1.0.1
    @types/json-stable-stringify@^1.0.34
    ajv@^8.11.0

#### Frontend

ipfs-http-client@49.0.0

semantic-ui-css@^2.4.1
semantic-ui-react@^2.0.3  
lodash@^4.17.14
react-copy-to-clipboard@^5.0.3
react-query@^3.27.0
"@emotion/react": "^11.10.0",
"@mantine/core": "^5.2.3",
"@mantine/hooks": "^5.2.3",

react-hot-toast@2.1.1

@types/react-copy-to-clipboard@^5.0.3

@hcaptcha/react-hcaptcha "^1.4.4",
"node-polyfill-webpack-plugin": "^2.0.1",
