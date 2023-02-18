import { web3FromAddress } from '@polkadot/extension-dapp';
import { KeypairType } from '@polkadot/util-crypto/types';

// Keyring
export interface InjectedAccountWithMeta {
  address: string;
  meta: {
    name: string;
    source: string;
    isInjected: boolean;
  };
  type?: KeypairType | undefined;
}

export type InjectedExtension = Awaited<ReturnType<typeof web3FromAddress>>;
