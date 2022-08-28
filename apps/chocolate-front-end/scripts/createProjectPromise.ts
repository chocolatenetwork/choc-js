import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { BN } from '@polkadot/util';
import { COUNCIL_LIMIT } from './init-projects';
import { EventList } from './types';
import { handleEvents } from './utils';

export function createProjectPromise(
  api: ApiPromise,
  meta: string,
  pair: KeyringPair,

  i: number,
  eventList: EventList[],
  alice: KeyringPair,
  eventList2: EventList[]
) {
  const pr1 = new Promise((res, rej) => {
    api.tx.chocolateModule
      .createProject(meta)
      .signAndSend(pair, handleEvents(api, [i, eventList], res, rej));
  }).then(async () => {
    const nextIP = await api.query.chocolateModule.nextProjectIndex();
    const nextI = nextIP.unwrap();
    const lastI = nextI.sub(new BN(1));
    const proposal = api.tx.chocolateModule.acceptProject(lastI);
//  Crete the proposal so that acceptLast just needs to accept all.
  const pr2= new Promise((res, rej) => {
	 api.tx.council
	      .propose(COUNCIL_LIMIT, proposal, proposal.encodedLength)
	      .signAndSend(alice, handleEvents(api, [i, eventList2], res, rej));
});
    await pr2;
  });
  return pr1;
}
