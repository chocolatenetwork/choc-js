import { blake2AsHex } from '@polkadot/util-crypto';
import stringify from 'safe-stable-stringify';

export function hashData(object: Record<string, unknown>, keys: string[]) {
  const filteredEntries = Object.entries(object).filter((each) => {
    return keys.includes(each[0]);
  });
  const stringifyObject = Object.fromEntries(filteredEntries);

  const objectstring = stringify(stringifyObject);
  const hex = blake2AsHex(objectstring);
  return hex;
}
