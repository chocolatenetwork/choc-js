import { Keyring } from '@polkadot/api';
import { makePair } from './makePair';


export function makePairsPair(
  user: [string, 'Native' | 'Dot' | 'Ksm' | 'Btc'],
  keyring: Keyring
) {
  const [derPath, curr] = user;
  const [, ...nameSec] = derPath.split('//');
  const pair = makePair(keyring, derPath, nameSec);
  return pair;
}
