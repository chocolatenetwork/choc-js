/**@file Replace GEnesis config for chocolate pallet */

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { BN } from '@polkadot/util';
import { acceptLast } from './acceptLast';

import { GenesisConfig, METADATA } from './constants';
import { createProjectPromise } from './createProjectPromise';
import { createUsers } from './createUsers';
import { makePair } from './makePair';
import { EventList } from './types';

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
  const iter_users = self.initUsers.map((e) => e[0]);
  const eventList: EventList[] = [];
  const promList: Promise<BN>[] = [];
  const promList2: Promise<BN>[] = [];
  const projectList = self.initProjects;
  const least = Math.min(
    METADATA.length,
    iter_users.length,
    projectList.length
  );

  for (const [i] of Array.from(Array(least)).entries()) {
    // create
    const [projectS] = projectList[i];
    const [derPath, curr] = self.initUsers[i];
    const [, ...nameSec] = derPath.split('//');
    const meta = METADATA[i];

    const pair = makePair(keyring, derPath, nameSec);
    // Ensure that the promises are serialised
    if (i === 0) {
      const pr1 = createProjectPromise(api, meta, pair, i, eventList);
      promList.push(pr1);
      if (projectS === 'Accepted') promList2.push(pr1);
    } else {
      const prev = promList[i - 1];
      const next = prev.then(() => {
        const pr = createProjectPromise(api, meta, pair, i, eventList);
        return pr;
      });
      promList.push(next);
      if (projectS === 'Accepted') promList2.push(next);
    }
  }
  await Promise.allSettled(promList);
  const acceptList = Promise.allSettled(promList2);
  const acceptRes = acceptLast({ api, keyring, waitFor: acceptList, self });
  return [...eventList, ...acceptRes];
}
export const COUNCIL_LIMIT = 6;
export type AcceptLastParams = {
  api: ApiPromise;
  keyring: Keyring;
  waitFor: Promise<PromiseSettledResult<BN>[]>;
  self: GenesisConfig;
};


