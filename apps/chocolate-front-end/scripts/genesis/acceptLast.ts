import { AcceptLastParams, COUNCIL_LIMIT } from '../init-projects';
import { EventList } from '../types';
import { handleEvents } from '../utils';
import { getWeight } from './getWeight';
import { makePairsPair } from './makePairsPair';

export async function acceptLast({
  api,
  keyring,
  waitFor,
  self,
}: AcceptLastParams): Promise<EventList[]> {
  // Bring all together after
  const eventList3: EventList[] = [];
  const eventList4: EventList[] = [];
  const users = self.initUsers.slice(0, COUNCIL_LIMIT);
  //  We have a list of proposal txs that are being sent.

  const acceptChain = waitFor

    .then(async () => {
      //We Then Vote on them
      const promList = [];
      const proposals = await api.query.council.proposals();
      console.log(`Found ${proposals.length} proposals to vote on`);

      for (const [i, user] of users.entries()) {
        const pair = makePairsPair(user, keyring);
        console.log(
          `This is ${pair.meta['name']}'s account with pubkey ${pair.address}`
        );
        console.log('Waiting TO vote AYE on all proposals');
        const prs = proposals.map(async (each) => {
          const proposal = await api.query.council.voting(each);
          const votes = proposal.unwrap();
          console.log(
            `Found proposal ${proposal.hash} with index ${votes.index}`
          );
          const pr4 = new Promise((res, rej) => {
            api.tx.council
              .vote(each, votes.index, true)
              .signAndSend(pair, handleEvents(api, [i, eventList3], res, rej));
          });
          return pr4;
        });
        promList.push(...prs);
      }
      const settled = await Promise.allSettled(promList);
      return settled;
    })
    //  .then(verifyAllSettled)
    .then(async () => {
      // then close them all.
      const alice = makePairsPair(users[0], keyring);
      const proposals = await api.query.council.proposals();
      console.log(
        `This is ${alice.meta['name']}'s account with pubkey ${alice.address}`
      );
      console.log('Waiting TO close txs');
      console.log(`Found ${proposals.length} proposals to close`);

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

      const allE = await Promise.allSettled(prs);
      return allE;
    });
  await acceptChain;
  return [...eventList3, ...eventList4];
}
