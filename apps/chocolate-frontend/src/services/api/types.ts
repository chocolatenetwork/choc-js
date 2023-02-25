import { web3FromAddress } from '@polkadot/extension-dapp';

export type AccountType = 'sr25519';
// Keyring
export interface InjectedAccountWithMeta {
  address: string;
  meta: {
    name: string;
    source: string;
    // whenCreated?: number; -- from polkadotjs api.
  };
  type?: AccountType | undefined;
}

export type InjectedExtension = Awaited<ReturnType<typeof web3FromAddress>>;
