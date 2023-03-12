import { web3FromAddress } from '@polkadot/extension-dapp';
import { KeypairType } from '@polkadot/util-crypto/types';

export const pairType = 'ecdsa' satisfies KeypairType;
export type $KeypairType = typeof pairType;
// Keyring
export interface InjectedAccountWithMeta {
  address: string;
  meta: {
    name: string;
    source: string;
    // whenCreated?: number; -- from polkadotjs api.
  };
  type?: $KeypairType | undefined;
}

export type InjectedExtension = Awaited<ReturnType<typeof web3FromAddress>>;
