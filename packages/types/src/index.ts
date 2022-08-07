import {
  typesBundle as chocolateTypesBundle,
  types as chocolateTypes,
  // rpc as acalaRpc,
  // signedExtensions as acalaSignedExtensions
} from '@choc-js/type-definitions';

import {
  OverrideBundleType,
  RegistryTypes,
  //   DefinitionRpc,
  //   DefinitionRpcSub,
} from '@polkadot/types/types';

// Augment-api does *.{query,rpc,error,consts,events,tx}
import './interfaces/augment-api';
import './interfaces/augment-types';
// Important to enable types auto complete
import './interfaces/types-lookup';
import './interfaces/registry';

export * from './interfaces/index';

export const types: RegistryTypes = chocolateTypes;

// export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = chocolateRpc;

export const typesBundle = chocolateTypesBundle as OverrideBundleType;

// export const signedExtensions = chocolateSignedExtensions;
