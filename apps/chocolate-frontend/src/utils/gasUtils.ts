import { Weight, WeightV2 } from '@polkadot/types/interfaces';
import { Registry } from '@polkadot/types/types';
import { BN } from '@polkadot/util';

export function getGasLimit(
  refTimeLimit: BN,
  proofSizeLimit: BN,
  registry: Registry
): WeightV2 {
  return registry.createType('WeightV2', {
    refTime: refTimeLimit,
    proofSize: proofSizeLimit,
  });
}
export function weightFromWeight(weight: Weight, registry: Registry): WeightV2 {
  return registry.createType('WeightV2', weight);
}
