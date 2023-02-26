import { Signer } from '@polkadot/types/types';

interface SignerOpts {
  signer: Signer;
}
export type GetFromAcctReturn = [address: string, signerOpts: SignerOpts];
