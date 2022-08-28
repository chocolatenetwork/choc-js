import { getWeight } from './genesis/getWeight';
import { AcceptLastParams, COUNCIL_LIMIT } from './init-projects';
import { makePairsPair } from "./makePairsPair";
import { EventList } from './types';
import { handleEvents } from './utils';

export function acceptLast({ api, keyring, waitFor, self }: AcceptLastParams): EventList[] {
  // Bring all together after
  const eventList2: EventList[] = [];
  const eventList3: EventList[] = [];
  const eventList4: EventList[] = [];
  const users = self.initUsers.slice(0, COUNCIL_LIMIT);

  waitFor
    .then(async (a) => {
      // FOr each of the settled we want to create a motion
      //first,  create motion
      const promList = [];

      for (const [i, index] of a.entries()) {
        const pr3 = new Promise((res, rej) => {
          if (index.status === 'rejected') {
            console.log('Rejecting sending proposal because Create failed');
            rej();
            return;
          }

          const lastI = index.value;
          const proposal = api.tx.chocolateModule.acceptProject(lastI);
          const pair = makePairsPair(users[0], keyring);
          api.tx.council
            .propose(COUNCIL_LIMIT, proposal, proposal.encodedLength)
            .signAndSend(pair, handleEvents(api, [i, eventList2], res, rej));
        });
        promList.push(pr3);
      }
      await Promise.allSettled(promList);
    })
    .then(async () => {
      //Then Vote
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
  return [...eventList2, ...eventList3, ...eventList4];
}
