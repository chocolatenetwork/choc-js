import { ApiBase } from '@polkadot/api/base';
import { ContractExecResultResult } from '@polkadot/types/interfaces';
import { RegistryError } from '@polkadot/types/types';

export function findError(
  api: ApiBase<'promise'>,
  result: ContractExecResultResult
) {
  return api.findError(result.asErr.value.toU8a());
}
export function formatRegistryError(err: RegistryError) {
  return `${err.section}.${err.method}:: ${err.docs.join(' ')}`;
}
