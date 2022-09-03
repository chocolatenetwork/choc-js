import chocolateModule from './chocolateModule';
import usersModule from './usersModule';
import { OverrideVersionedType } from '@polkadot/types/types';
import { typesFromDefs } from '@open-web3/orml-type-definitions/utils';
import chocVersioned from './spec/chocolate';

// Required because of import issue. https://github.com/nrwl/nx/issues/7123 Cannot import from anywhere except index.ts in this lib
export { default as chocolateModule } from './chocolateModule';
export { default as usersModule } from './usersModule';

const chocDefs = {
  chocolateModule,
  usersModule,
};

export const types = typesFromDefs(chocDefs);
// Use when we have rpc. Alongside keys
// export const rpc = jsonrpcFromDefs(acalaDefs, { ...ormlRpc });
function getBundle(versioned: OverrideVersionedType[]) {
  return {
    rpc: {},
    instances: {
      council: ['generalCouncil'],
    },
    types: [...versioned].map((version) => {
      return {
        minmax: version.minmax,
        types: {
          ...types,
          ...version.types,
        },
      };
    }),
    alias: {},
  };
}

export const typesBundle = {
  spec: {
    chocolate: getBundle(chocVersioned),
  },
};

export const typesBundleForPolkadot = {
  spec: {
    chocolate: getBundle(chocVersioned),
  },
};
