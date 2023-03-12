import { EventList } from '$chocolate-frontend/utils/EventList';
import { getGasLimit } from '$chocolate-frontend/utils/gasUtils';
import { handleEvents } from '$chocolate-frontend/utils/handleEvents';
import { ApiPromise } from '@polkadot/api';
import { setupApiAndKeyring } from '../../utils/apiSetup/setupApiAndKeyring';
import { getFromAcct } from '../../utils/getFromAcct';
export enum AccountType {
  Project = 'Project',
  User = 'User',
}


export default setupApiAndKeyring(async (ctx, accountType: AccountType) => {
  const {
    apiCtx: { api: contract },
    keyringCtx: { selectedAccount },
  } = ctx;
  const [address, signer] = await getFromAcct(selectedAccount);
  const { api } = contract;
  const gasLimit = api.registry.createType('WeightV2', {
    refTime: 300000000000n,
    proofSize: 262144,
  });

  function initiateFlowQuery() {
    return contract.query.initiateVerficationFlow(address, {
      gasLimit,
      storageDepositLimit: null,
      value: 0,
    });
  }
  const eventList: EventList[] = [];
  const txPromise = new Promise((res, rej) => {
    initiateFlowQuery()
      .then(({ gasRequired, storageDeposit }) => {
        const gasLimit = getGasLimit(
          gasRequired.refTime.toBn(),
          gasRequired.proofSize.toBn(),
          contract.registry
        );
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
  const signatureResult = await initiateFlowQuery();
  const signature = signatureResult.result.asOk.data;
  const sign2 = signature.toHuman();

  console.log({ sign2 });

  return sign2;
});
