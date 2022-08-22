import { KeyringPair } from '@polkadot/keyring/types';
import { Signer } from '@polkadot/types/types';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';

/**
 * Sign the user's keypair and provide Auth headers alongside raw
 */
async function getW3AuthSignature(pair: KeyringPair, signer: Signer) {
  let signature: string;
  if (signer.signRaw) {
    const res = await signer.signRaw({
      address: pair.address,
      data: stringToHex(pair.address),
      type: 'bytes',
    });

    signature = res.signature;
  } else {
    signature = u8aToHex(pair.sign(stringToU8a(pair.address)));
  }
  const perSignData = `${pair.address}:${signature}`;
  const base64Signature = Buffer.from(perSignData).toString('base64');
  const AuthBasic = `Basic ${base64Signature}`;
  const AuthBearer = `Bearer ${base64Signature}`;
  return { signature, AuthBasic, AuthBearer };
}
