import { getWeight } from './genesis/getWeight';
import { AcceptLastParams, COUNCIL_LIMIT } from './init-projects';
import { makePairsPair } from "./makePairsPair";
import { EventList } from './types';
import { handleEvents } from './utils';

export async function acceptLast({ api, keyring, waitFor, self }: AcceptLastParams): Promise<EventList[]> {
  // Bring all together after
  const eventList3: EventList[] = [];
  const eventList4: EventList[] = [];
  const users = self.initUsers.slice(0, COUNCIL_LIMIT);
  //  We have a list of proposal txs that are being sent.

 const acceptChain= waitFor
    
    .then(async () => {
      //We Then Vote on them
      const promList = [];
      const proposals = await api.query.council.proposals();

      for (const [i, user] of users.entries()) {
        const pair = makePairsPair(user, keyring);
        const prs = proposals.map(async (each) => {
          const proposal = await api.query.council.voting(each);
          const votes = proposal.unwrap();

          const pr4 = new Promise((res, rej) => {
            api.tx.council
              .vote(each, votes.index, true)
              .signAndSend(pair, handleEvents(api, [i, eventList3], res, rej));
          });
          return pr4;
        });
        promList.push(...prs);
      }
      await Promise.allSettled(promList);
    })
    .then(async () => {
      // then close them all.
      const alice = makePairsPair(users[0], keyring);
      const proposals = await api.query.council.proposals();
      const prs = proposals.map(async (each, i) => {
        const votesOpt = await api.query.council.voting(each);
        const proposalOf = await api.query.council.proposalOf(each);
        const votes = votesOpt.unwrap();
        const [weight, encodedLen] = await getWeight(api, proposalOf.unwrap());
        const pr5 = new Promise((res, rej) => {
          api.tx.council
            .close(each, votes.index, weight, encodedLen)
            .signAndSend(alice, handleEvents(api, [i, eventList4], res, rej));
        });
        return pr5;
      });

      await Promise.allSettled(prs);
    });
  await acceptChain;
  return [ ...eventList3, ...eventList4];
}
