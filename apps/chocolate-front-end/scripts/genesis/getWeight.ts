import { ApiPromise } from "@polkadot/api";
import { Call } from "@polkadot/types/interfaces";
import { BN, BN_ZERO, isFunction } from "@polkadot/util";

// a random address that we are using for our queries
const ZERO_ACCOUNT = '5CAUdnwecHGxxyr5vABevAfZ34Fi4AaraDRMwfDQXQ52PXqg';
const EMPTY_STATE: [BN, number] = [BN_ZERO, 0];

type WeightTuple = [
            weight: BN,
            encodedLength: number
          ];
// for a given call, calculate the weight
async function getWeight(
  api: ApiPromise,
  call?: Call | null
): Promise<[weight: BN, encodedLength: number]> {
  if (call && isFunction(api.rpc.payment?.queryInfo)) {
    const weight = await api
      .tx(call)
      .paymentInfo(ZERO_ACCOUNT)
      .then(({ weight }) => [weight, call.encodedLength] as WeightTuple)
      .catch(console.error);
    if (weight) return weight;
    else throw new Error('Cannot calculate weight');
  } else {
    return EMPTY_STATE;
  }
}

export { getWeight };
