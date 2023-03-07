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

  const message = contract.abi.messages.find(
    (value) => value.method === 'initiateVerificationFlow'
  );

  console.log(message);
  const pr = new Promise((res, rej) => {
    contract.query
      .initiateVerficationFlow(address, {
        gasLimit,
        storageDepositLimit: null,
        value: 0,
        // value: message?.isPayable ? dbValue : 0
      })
      .then(({ gasRequired, result, gasConsumed }) => {
        if (result.isOk) {
          const weight2 = api.registry.createType('WeightV2', gasRequired);
          console.log('weight2.refTime.toHuman(), weight2.proofSize.toHuman()');
          console.log(weight2.refTime.toHuman(), weight2.proofSize.toHuman());
          console.log('weight2.toHuman()', weight2.toHuman());
          // We want this:
          console.log('result.asOk.toHuman()', result.asOk.toHuman());
          console.log('gasConsumed.toHuman()', gasConsumed.toHuman());
          // if (weight.isWeightV2) {
          res('Hi');
        } else {
          console.log(gasRequired.toHuman());
          console.log(api.registry.findMetaError(result.asErr.asModule));
          rej(null);
        }
        // setEstimatedWeightV2(
        //   result.isOk ?  : null
        // );
        // } else {
        //   setEstimatedWeight(result.isOk ? gasRequired.refTime.toBn() : null);
        // }
      });
  });
  const result = await pr;
  return result;
});

// export default setupApiAndKeyring(async (ctx, accountType: AccountType) => {
//   const {
//     apiCtx: { api: contract },
//     keyringCtx: { selectedAccount },
//   } = ctx;
//   const [address, signer] = await getFromAcct(selectedAccount);

//   const eventList: EventList[] = [];
//   const pr = new Promise((res, rej) => {
//     contract.query
//       .initiateVerficationFlow(address, {})
//       .then((value) => {
//         console.log(value.storageDeposit.value.toHuman());
//         const gasLimit = getGasLimit(
//           value.gasRequired.refTime.toBn(),
//           value.gasRequired.proofSize.toBn(),
//           contract.registry
//         );
//         console.log(gasLimit.toHuman());
//         contract.tx
//           .initiateVerficationFlow({
//             storageDepositLimit: value.storageDeposit.asCharge,
//             gasLimit: gasLimit,
//             value: 100n,
//           })
//           .signAndSend(
//             address,
//             signer,
//             handleEvents(contract.api as ApiPromise, [0, eventList], res, rej)
//           );
//       })
//       .catch(rej);
//   });

//   const response = await pr;
//   console.log({ response });

//   // return response;
// });
