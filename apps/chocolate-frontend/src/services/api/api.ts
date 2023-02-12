import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';

type AbiType = Record<any, any>;
export async function createApi() {
  const { default: contractAbi } = await import(
    '../../assets/contract/abi.json'
  );

  const ALICE_ADDRESS = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
  // Init
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({ provider: wsProvider });

  const keyring = new Keyring({ type: 'sr25519' });
  const alicePair = keyring.addFromUri('//Alice');

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
}
