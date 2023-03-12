import { ApiBase } from '@polkadot/api/base';

export function defaultGasLimit(api: ApiBase<'promise'>) {
  return api.registry.createType('WeightV2', {
    refTime: 300000000000n,
    proofSize: 262144,
  });
}
