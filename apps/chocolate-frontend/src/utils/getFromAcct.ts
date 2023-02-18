import { web3FromSource } from '@polkadot/extension-dapp';
import { Signer } from '@polkadot/types/types';
import { InjectedAccountWithMeta } from '../services/api/types';

/**
 * Extracted from: https://github.com/substrate-developer-hub/substrate-front-end-template/blob/main/src/substrate-lib/components/TxButton.js#L46-L60
 *
 *
 * Returns the first argument to api.tx.[Call]().signAndSend
 *
 */

async function getFromAcct(currentAccount: InjectedAccountWithMeta) {
  const {
    address,
    meta: { source, isInjected },
  } = currentAccount;

  if (!isInjected) {
    return [currentAccount] as [InjectedAccountWithMeta];
  }

  // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
  // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
  const injector = await web3FromSource(source);
  return [address, { signer: injector.signer }] as [string, { signer: Signer }];
}
