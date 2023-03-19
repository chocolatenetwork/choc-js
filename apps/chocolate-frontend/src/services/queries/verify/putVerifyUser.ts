import { getFromAcct } from '$chocolate-frontend/utils/apiSetup/getFromAcct';
import { setupApiAndKeyring } from '$chocolate-frontend/utils/apiSetup/setupApiAndKeyring';
import { EventList } from '$chocolate-frontend/utils/EventList';
import { weightFromWeight } from '$chocolate-frontend/utils/gasUtils';
import { handleEvents } from '$chocolate-frontend/utils/handleEvents';
import { ApiPromise } from '@polkadot/api';
import getInitiateVerificationFlow from './getInitiateVerificationFlow';
import { AccountType } from './types';
export default setupApiAndKeyring(async (ctx, accountType: AccountType) => {
  const {
    apiCtx: { contract },
    keyringCtx: { selectedAccount },
  } = ctx;
  const [address, signer] = await getFromAcct(selectedAccount);
  const eventList: EventList[] = [];
  const txPromise = new Promise((res, rej) => {
    getInitiateVerificationFlow({ accountType, address })
      .then(({ rawResult }) => {
        const { gasRequired, storageDeposit } = rawResult;
        const gasLimit = weightFromWeight(gasRequired, contract.registry);
        contract.tx
          .initiateVerficationFlow({
            storageDepositLimit: storageDeposit.asCharge,
            gasLimit: gasLimit,
            // value: 100n,
          })
          .signAndSend(
            address,
            signer,
            handleEvents(contract.api as ApiPromise, [0, eventList], res, rej)
          );
      })
      .catch(rej);
  });
  // Wait for tx.
  await txPromise;
  const { result } = await getInitiateVerificationFlow({
    accountType,
    address,
  });
  return result.toHuman();
});
