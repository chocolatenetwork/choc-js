import { Keyring } from '@polkadot/api';
import { AllIds } from '../../src/customComponents/ProjectProfile/hooks/useReviewSend';
import { makePair } from './makePair';


export function makePairsPair(
  user: [string, AllIds],
  keyring: Keyring
) {
  const [derPath, curr] = user;
  const [, ...nameSec] = derPath.split('//');
  const pair = makePair(keyring, derPath, nameSec);
  return pair;
}
