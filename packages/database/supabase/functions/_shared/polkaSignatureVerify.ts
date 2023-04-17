import { signatureVerify } from '@polkadot/util-crypto';

/**
 *
 * @param address A regular public address string
 * @param message Hex encoded version of message
 * @param signature Hex encoded signature
 * @returns
 */
export function polkaSignatureVerify(
  address: string,
  message: string,
  signature: string
) {
  const { isValid } = signatureVerify(message, signature, address);
  return isValid;
}
