/**@file Replace GEnesis config for chocolate pallet */

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';

import { GenesisConfig } from './constants';
import { createProjects } from './genesis/createProjects';
import { createReviews } from './genesis/createReviews';
import { createUsers } from './genesis/createUsers';
import { EventList } from './types';

export type BuildEvents = [
  userEvents: EventList[],
  projectEvents: EventList[],
  reviewEvents: EventList[]
];

// Genesis build
// Initialise and accept all projects and reviews
export async function build(self: GenesisConfig): Promise<BuildEvents> {
  // create users
  // Construct
  //wss://8844-islami00-chocolateparac-09dna30yrir.ws-eu63.gitpod.io
  const wsProvider = new WsProvider(
    'wss://8844-islami00-chocolateparac-09dna30yrir.ws-eu63.gitpod.io'
  );
  const api = await ApiPromise.create({ provider: wsProvider });
  //   Create users
  const keyring = new Keyring({ type: 'sr25519' });
  const eventList = await createUsers(self, api, keyring);
  const eventList2 = await createProjects(self, api, keyring);

  const eventList3 = await createReviews(self, api, keyring);
  api.disconnect();
  return [eventList, eventList2, eventList3];
}

export const COUNCIL_LIMIT = 6;
export type AcceptLastParams = {
  api: ApiPromise;
  keyring: Keyring;
  waitFor: Promise<PromiseSettledResult<unknown>[]>;
  self: GenesisConfig;
};


