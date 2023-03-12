import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { ApiMachineSender } from '../machines/Api';

type AbiType = Record<string, unknown>;

// May need some clever way to get this from user input or elsewhere
// Paste the address here each time it's uploaded
// Look into whether we can query for this
export const CONTRACT_ADDRESS =
  '5DAmdtaZj3NpwDcNVLPLD7rU2mfqVERjQg1Pbc2fFeN6fddN';
export async function createApi(send: ApiMachineSender): Promise<() => Promise<void>> {
  const { default: contractAbi } = await import(
    '../../assets/contract/chocolate.json'
  );

  // const ALICE_ADDRESS = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
  // Init
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = new ApiPromise({ provider: wsProvider });

  // const keyring = new Keyring({ type: 'sr25519' });
  // const alicePair = keyring.addFromUri('//Alice');

  function createContract() {
    // The address is the actual on-chain address as ss58 or AccountId object.
    const contract = new ContractPromise(
      api,
      contractAbi as AbiType,
      CONTRACT_ADDRESS
    );
    console.log(contract.query);
    return contract;
  }
  // Set listeners for disconnection and reconnection event.
  api.on('connected', () => {
    send({ type: 'CONNECT' });
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    api.isReady.then((_api) => {
      const contract = createContract();
      return send({ type: 'CONNECT_SUCCESS', api: contract });
    });
  });
  api.on('ready', () => {
    const contract = createContract();
    return send({ type: 'CONNECT_SUCCESS', api: contract });
  });
  api.on('error', () => send({ type: 'ERROR' }));

  return api.disconnect;
}


