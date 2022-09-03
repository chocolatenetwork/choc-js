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
  const gEventList: EventList[] = [];

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
    //   Filter out those owned by this user to avoid err.
    const allPrs = _allPrs.filter(([, v]) => {
      const pr = v.unwrap();
      const ownerIdStr = pr.ownerId.toHuman();
      const isAccepted = pr.proposalStatus.status.isAccepted;
      const notOwnerRevProj = ownerIdStr !== pair.address;
      return notOwnerRevProj && isAccepted;
    });

    //  Create a review, for each of the rest, and stage a proposal to accept
    for (const each of allPrs) {
      const [key] = each;
      const [i2] = key.args;
      const eventList: EventList[] = [];
      const eventList2: EventList[] = [];
      const pr = new Promise((res, rej) => {
        api.tx.chocolateModule
          .createReview(rev, i2, curr)
          .signAndSend(pair, handleEvents(api, [i, eventList], res, rej));
      }).then(async () => {
        const proposal = api.tx.chocolateModule.acceptReview(pair.address, i2);
        //  Create the proposal so that acceptLast just needs to accept all.
        return createProposal(api, proposal, alice, i, eventList2);
      });
      // Wait for the tx to avoid nonce errors (*)
      await Promise.allSettled([pr]);
      promList.push(pr);
      gEventList.push(...eventList, ...eventList2);
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
  const filtered = gEventList.filter((e) => !!e);
  // And Return eventList
  return [...filtered, ...acceptRes];
}
