import { AnyJson } from '@polkadot/types/types';
import Keyring from '@polkadot/keyring';

type PinServerRes = {
  error?: AnyJson;
  success?: string;
};
export  type OnAddrChange = (addr: string, keyring: Keyring) => void;
export interface AccountSelectorProps extends JSX.IntrinsicAttributes{
 onAddrChange?: OnAddrChange;
}
export type { PinServerRes };
