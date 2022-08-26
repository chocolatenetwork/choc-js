import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { Signer } from '@polkadot/types/types';
import { bufferToU8a,u8aToBuffer, stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';

/**
 * Sign the user's keypair and provide Auth headers alongside raw
 */
export async function getW3AuthSignature(pair: KeyringPair, signer?: Signer, api?:ApiPromise) {
  let signature: string;
  if (signer && signer.signRaw) {
    const res = await signer.signRaw({
      address: pair.address,
      data: u8aToHex(stringToU8a(pair.address)),
      type: 'bytes',
    });

    signature = res.signature;
  } else if(api){

    const rawSign = await api.sign(pair, {
      data: pair.address,
    });
    signature = stringToHex(rawSign)
  }else {
    // Todo: Fix signature format
    signature = u8aToHex(pair.sign(stringToU8a(pair.address)));
  }
  const perSignData = `${pair.address}:${signature}`;
  const base64Signature = perSignData;
  const AuthBasic = `Basic ${base64Signature}`;
  const AuthBearer = `Bearer ${base64Signature}`;
  return { signature, AuthBasic, AuthBearer };
}
