import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { Signer } from '@polkadot/types/types';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { base64Encode } from '@polkadot/util-crypto';

/**
 * Sign the user's keypair and provide Auth headers alongside raw
 */
export async function getW3AuthSignature(
  address: string,
  signer?: Signer,
  pair?: KeyringPair,
  api?: ApiPromise
) {
  let signature: string;
  if (signer && signer.signRaw) {
    const res = await signer.signRaw({
      address: address,
      data: address,
      type: 'bytes',
    });

    signature = res.signature;
  } else if (api) {
    const rawSign = await api.sign(address, {
      data: address,
    });
    signature = stringToHex(rawSign);
  } else {
    // Todo: Fix signature format
    const sigRaw = pair?.sign(stringToU8a(address));
    signature = u8aToHex(sigRaw);
  }
  const perSignData = `${address}:${signature}`;
  // const base64Signature = Buffer.from(perSignData).toString('base64');
  const base64Signature = base64Encode(perSignData);
  const AuthBasic = `Basic ${base64Signature}`;
  const AuthBearer = `Bearer ${base64Signature}`;
  return { signature, AuthBasic, AuthBearer };
}
