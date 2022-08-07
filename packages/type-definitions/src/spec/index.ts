import type { OverrideVersionedType } from '@polkadot/types/types';

import chocolate from './chocolate';

// Type overrides for specific spec types & versions as given in runtimeVersion
const typesSpec: Record<string, OverrideVersionedType[]> = {
  chocolate: chocolate,
};

export default typesSpec;
