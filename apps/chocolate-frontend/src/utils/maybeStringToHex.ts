import { isHex, stringToHex } from '@polkadot/util';

/**
 * Converts the string to hex if not already
 */
export function maybeStringToHex(str: string) {
  if (isHex(str)) return str;
  return stringToHex(str);
}
