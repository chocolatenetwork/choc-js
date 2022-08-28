/**@file Replace GEnesis config for chocolate pallet */

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';

import { GenesisConfig } from './constants';
import { createProjects } from './genesis/createProjects';
import { createUsers } from './genesis/createUsers';
import { EventList } from './types';

// Genesis build
// Initialise and accept all projects
export async function build(
  self: GenesisConfig
): Promise<[userEvents: EventList[], projectEvents: EventList[]]> {
  // create users
  // Construct
  const wsProvider = new WsProvider('ws://127.0.0.1:8845');
  const api = await ApiPromise.create({ provider: wsProvider });
  //   Create users
  const keyring = new Keyring({ type: 'sr25519' });
  const eventList = await createUsers(self, api, keyring);
  const eventList2 = await createProjects(self, api, keyring);

  api.disconnect();
  return [eventList, eventList2];
}

export const COUNCIL_LIMIT = 6;
export type AcceptLastParams = {
  api: ApiPromise;
  keyring: Keyring;
  waitFor: Promise<PromiseSettledResult<void>[]>;
  self: GenesisConfig;
};


