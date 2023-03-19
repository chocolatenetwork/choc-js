import { u8aIsWrapped, u8aUnwrapBytes, u8aWrapBytes } from '@polkadot/util';

/**
 *
 * @param input u8a of hex-encoded message
 * @param withEthereum To use ethereum style unwrapping or not.
 * Set to true if checking a message from ethereum and then false to test substrate.
 * This is if we will be verifying signature ourselves (e.g on ink!). `signatureVerify` from polkadotjs does this "toggling" by default.
 */
export function getVerifiableMessage(input: Uint8Array, withEthereum = false) {
  if (u8aIsWrapped(input, withEthereum)) return u8aUnwrapBytes(input);
  return u8aWrapBytes(input);
}
