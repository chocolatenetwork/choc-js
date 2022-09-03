import { ApiPromise, Keyring } from '@polkadot/api';
import { GenesisConfig, METADATA } from '../constants';
import { EventList } from '../types';
import { acceptLast } from './acceptLast';
import { createProjectPromise } from './createProjectPromise';
import { makePair } from './makePair';
import { makePairsPair } from './makePairsPair';

/**
 * Creates projects in a chain. If any project isn't created, the rest also fail.
 */
export async function createProjects(
  self: GenesisConfig,
  api: ApiPromise,
  keyring: Keyring
) {
  // create projects
  const iter_users = self.initUsers.map((e) => e[0]);
  const eventList: EventList[] = [];
  const eventList2: EventList[] = [];
  const promList: Promise<void>[] = [];
  const promList2: Promise<void>[] = [];
  const projectList = self.initProjects;
  const least = Math.min(
    METADATA.length,
    iter_users.length,
    projectList.length
  );
  const alice = makePairsPair(self.initUsers[0], keyring);

  for (const [i] of Array.from(Array(least)).entries()) {
    // create
    const [projectS] = projectList[i];
    const [derPath] = self.initUsers[i];
    const [, ...nameSec] = derPath.split('//');
    const meta = METADATA[i];

    const pair = makePair(keyring, derPath, nameSec);
    // Ensure that the promises are serialised
    if (i === 0) {
      const pr1 = createProjectPromise(
        api,
        meta,
        pair,
        i,
        eventList,
        alice,
        eventList2
      );
      promList.push(pr1);
      if (projectS === 'Accepted') promList2.push(pr1);
    } else {
      const prev = promList[i - 1];
      const next = prev.then(() => {
        const pr = createProjectPromise(
          api,
          meta,
          pair,
          i,
          eventList,
          alice,
          eventList2
        );
        return pr;
      });
      promList.push(next);
      if (projectS === 'Accepted') promList2.push(next);
    }
  }
  await Promise.allSettled(promList);
  const acceptList = Promise.allSettled(promList2);

  const acceptRes = await acceptLast({
    api,
    keyring,
    waitFor: acceptList,
    self,
  });
  return [...eventList, ...eventList2, ...acceptRes];
}
