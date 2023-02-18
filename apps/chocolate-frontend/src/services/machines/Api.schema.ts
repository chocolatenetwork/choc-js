import { ContractPromise } from '@polkadot/api-contract';

export interface ApiContext {
  api: ContractPromise;
}
export type ApiEvents =
  | { type: 'CONNECT' }
  | { type: 'DISCONNECT' }
  | { type: 'CONNECT_SUCCESS'; api: ContractPromise }
  | { type: 'ERROR' };
