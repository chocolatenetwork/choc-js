import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { ApiMachineSender } from '../machines/Api';

type AbiType = Record<string, unknown>;
export async function createApi(
  send: ApiMachineSender
): Promise<ContractPromise> {
  const { default: contractAbi } = await import(
    '../../assets/contract/abi.json'
  );
  console.log('contractAbi:', contractAbi);
  // const ALICE_ADDRESS = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
  // Init
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = new ApiPromise({ provider: wsProvider });

  // const keyring = new Keyring({ type: 'sr25519' });
  // const alicePair = keyring.addFromUri('//Alice');

  // May need some clever way to get this from user input or elsewhere
  // Paste the address here each time it's uploaded
  // Look into whether we can query for this
  const contractAddress = '5GvqYaQbyRKTKUtKtDCqwu5qqJKcKAnhzCWCDF6fo9NkG2Zc';

  // The address is the actual on-chain address as ss58 or AccountId object.
  const contract = new ContractPromise(
    api,
    contractAbi as AbiType, // Abi is generated automatically.
    contractAddress
  );

  // Set listeners for disconnection and reconnection event.
  api.on('connected', () => {
    send({ type: 'CONNECT' });
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    api.isReady.then((_api) =>
      send({ type: 'CONNECT_SUCCESS', api: contract })
    );
  });
  api.on('ready', () => send({ type: 'CONNECT_SUCCESS', api: contract }));
  api.on('error', () => send({ type: 'ERROR' }));
  console.log('contract.query parts:', contract.query);

  return contract;
}


