/* eslint-disable */
import type { Config } from '@jest/types';
const augImports = [
  '@polkadot/api-base/types',
  '@polkadot/rpc-core/types',
  '@polkadot/util',
  '@polkadot/types',
  '@polkadot/types-codec',
];
export default {
  displayName: 'chocolate-front-end',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/apps/chocolate-front-end',
  transformIgnorePatterns: [`/node_modules/(?!(${augImports.join('|')})/)`],
} as Config.InitialOptions;
