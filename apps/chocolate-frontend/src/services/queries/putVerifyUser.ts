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

  const eventList: EventList[] = [];
  const pr = new Promise((res, rej) => {
    contract.query
      .initiateVerficationFlow(address, {})
      .then((value) => {
        console.log(value.storageDeposit.value.toHuman());
        const gasLimit = getGasLimit(
          value.gasRequired.refTime.toBn(),
          value.gasRequired.proofSize.toBn(),
          contract.registry
        );
        console.log(gasLimit.toHuman());
        contract.tx
          .initiateVerficationFlow({
            storageDepositLimit: value.storageDeposit.asCharge,
            gasLimit: gasLimit,
            value: 100n,
          })
          .signAndSend(
            address,
            signer,
            handleEvents(contract.api as ApiPromise, [0, eventList], res, rej)
          );
      })
      .catch(rej);
  });

  const response = await pr;
  console.log({ response });

  // return response;
});

