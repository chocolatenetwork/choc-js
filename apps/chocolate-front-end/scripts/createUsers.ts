import { ApiPromise, Keyring } from '@polkadot/api';
import { GenesisConfig } from './constants';
import { EventList } from './types';
import { handleEvents } from './utils';

export async function createUsers(
  self: GenesisConfig,
  api: ApiPromise,
  keyring: Keyring) {
  // create users
  const iter_users = self.initUsers.map((e) => e[0]).entries();
  const eventList: EventList[] = [];
  const prList = [];
  for (const [i, derPath] of iter_users) {
    const [, ...nameSec] = derPath.split('//');
    const pair = keyring.addFromUri(derPath, {
      name: `${nameSec.join(' ')} default`,
    });
    console.log(
      `This is ${pair.meta['name']}'s account with pubkey ${pair.address}`
    );
    console.log('Waiting for tx');
    const pr = new Promise((res, rej) => {
      api.tx.usersModule
        .makeUser()
        .signAndSend(pair, handleEvents(api, [i, eventList], res, rej));
    });
    prList.push(pr);
  }
  await Promise.allSettled(prList);
  return eventList;
}
