import { web3FromSource } from '@polkadot/extension-dapp';
import { Signer } from '@polkadot/types/types';
import { InjectedAccountWithMeta } from '../services/api/types';

type SignerOpts =
  | Record<string, string>
  | {
      signer: Signer;
    };

export type GetFromAcctReturn = [address: string, signerOpts: SignerOpts];

/**
 * Extracted from: https://github.com/substrate-developer-hub/substrate-front-end-template/blob/main/src/substrate-lib/components/TxButton.js#L46-L60
 *
 *
 * Returns the first couple args to api.tx.[Call]().signAndSend
 * Nb: Changed use of InjectedAccountWithMeta to just [string].
 * Working theory is that the snippet referenced takes advantage of the fact that the address is also defined on KeyringPair. Despite the types not matching.
 */

export async function getFromAcct(
  currentAccount: InjectedAccountWithMeta
): Promise<GetFromAcctReturn> {
  const {
    address,
    meta: { source },
  } = currentAccount;

  // if (isInjected) {
  //   return [address, {}];
  // }

  // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
  // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
  const injector = await web3FromSource(source);
  return [address, { signer: injector.signer }];
}
