import { Keyring } from '@polkadot/api';

export function makePair(keyring: Keyring, derPath: string, nameSec: string[]) {
  return keyring.addFromUri(derPath, {
    name: `${nameSec.join(' ')} default`,
  });
}
