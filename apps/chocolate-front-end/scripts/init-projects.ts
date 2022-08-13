/**@file Replace GEnesis config for chocolate pallet */

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';

import { GenesisConfig } from './constants';
import { EventList } from './types';
import { handleEvents } from './utils';

// Genesis build
// Initialise and accept all projects
export async function build(
  self: GenesisConfig
): Promise<[userEvents: EventList[]]> {
  // create users
  // Construct
  const wsProvider = new WsProvider('ws://127.0.0.1:8845');
  const api = await ApiPromise.create({ provider: wsProvider });
  //   Create users
  const keyring = new Keyring({ type: 'sr25519' });
  const eventList = await createUsers(self, api, keyring);
  const eventList2 = await createProjects(self, api, keyring);

  api.disconnect();
  return [eventList];
}

async function createProjects(
  self: GenesisConfig,
  api: ApiPromise,
  keyring: Keyring
) {
  // create projects
  const iter_users = self.initUsers.map((e) => e[0]).entries();
  const eventList: EventList[] = [];
  const prList = [];
}
async function createUsers(
  self: GenesisConfig,
  api: ApiPromise,
  keyring: Keyring
) {
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
