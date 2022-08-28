import { ApiPromise, Keyring } from '@polkadot/api';
import { GenesisConfig, REVS } from '../constants';
import { EventList } from '../types';
import { handleEvents, logPair } from '../utils';
import { acceptLast } from './acceptLast';
import { createProposal } from './createProposal';
import { makePairsPair } from './makePairsPair';

export async function createReviews(
  self: GenesisConfig,
  api: ApiPromise,
  keyring: Keyring
): Promise<EventList[]> {
  const users = self.initUsers;
  const eventList: EventList[] = [];
  const eventList2: EventList[] = [];
  const promList = [];
  const least = Math.min(REVS.length, users.length);
  //  For each user,
  for (const [i] of Array.from(Array(least)).entries()) {
    const userPair = self.initUsers[i];
    const alicePair = self.initUsers[0];
    const rev = REVS[i];
    const [, curr] = userPair;
    const pair = makePairsPair(userPair, keyring);

    const alice = makePairsPair(alicePair, keyring);
    logPair(pair);
    console.log(
      'Waiting for tx to create and propose all reviews for acceptance'
    );

    // Get all projects
    const _allPrs = await api.query.chocolateModule.projects.entries();
    //   Filter those owned by this user to avoid err.
    const allPrs = _allPrs.filter(([, v]) => {
      const ownerIdStr = v.unwrap().ownerId.toHuman();
      return ownerIdStr !== pair.address;
    });

    //  Create a review, for each of the rest, and stage a proposal to accept
    const nonce = await api.rpc.system.accountNextIndex(pair.address);
    for (const each of allPrs) {
      const [key] = each;
      const [i2] = key.args;

      const pr = new Promise((res, rej) => {
        api.tx.chocolateModule
          .createReview(rev, i2, curr)
          .signAndSend(pair, handleEvents(api, [i, eventList], res, rej));
      }).then(async () => {
        const proposal = api.tx.chocolateModule.acceptReview(pair.address, i2);
        //  Create the proposal so that acceptLast just needs to accept all.
        return createProposal(api, proposal, alice, i, eventList2);
      });
      await Promise.allSettled([pr]);
      promList.push(pr);
    }
  }

  // Then have them all accepted
  const acceptList = Promise.allSettled(promList);
  await acceptList;
  const acceptRes = await acceptLast({
    api,
    keyring,
    waitFor: acceptList,
    self,
  });
  // And Return eventList
  return [...eventList, ...eventList2, ...acceptRes];
}
