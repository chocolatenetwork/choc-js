import { getVerifiableMessage } from '$chocolate-frontend/utils/getVerifiableMessage';
import { hexToU8a } from '@polkadot/util';
import { decodeAddress, signatureVerify } from '@polkadot/util-crypto';

/**
 * Get parameters to pass to verifyIdentityResponse test.
 *
 * @param msg A hex-encoded message
 * @param sig An ecdsa signature generated using signRaw query
 * @param addr Any decodeable address
 * @returns
 * @example
 * ```ts
 * const msg =
 *   '0x00908f9bea46da02ae81cde39ed135d4e07408a9fc5e8a0721ae12b7995a323db31f00000001';
 * const sig =
 *   '0x0439fd522cc8125dc7e77c1088de78da9c994c5e941d17e943aa723b949823f60da9be3c6b1e3bed6a2d1db4b4fa8bb2fb10d8c24526629a540ccf468af8d1f101';
 * const addr = '5FK12BPMRx3PRmMGJ7RtKbUQ3Us8xau19qvmdfP2sDs1mtJK';
 * console.log(getVerifyIdentityResponseTestData(msg, sig, addr));
 * ```
 */
export function getVerifyIdentityResponseTestData(
  msg: string,
  sig: string,
  addr: string
) {
  const aza = decodeAddress(addr);

  // It wraps the u8a bytes if not already. u8aWrapBytes. extends to 53bits
  const isValid = signatureVerify(msg, hexToU8a(sig), aza);

  return {
    msg: Array.from(hexToU8a(msg)),
    msgWrapped: Array.from(getVerifiableMessage(hexToU8a(msg))),
    sig: Array.from(hexToU8a(sig)),
    aza: Array.from(aza),
    isValid,
  };
}
