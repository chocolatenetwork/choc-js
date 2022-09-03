import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { BN } from '@polkadot/util';
import { EventList } from '../types';
import { handleEvents } from '../utils';
import { createProposal } from './createProposal';

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
    console.log(
      `This is ${pair.meta['name']}'s account with pubkey ${pair.address}`
    );
    console.log('Waiting for tx to create project');
    api.tx.chocolateModule
      .createProject(meta)
      .signAndSend(pair, handleEvents(api, [i, eventList], res, rej));
  }).then(async () => {
    const nextIP = await api.query.chocolateModule.nextProjectIndex();
    const nextI = nextIP.unwrap();
    const lastI = nextI.sub(new BN(1));
    const proposal = api.tx.chocolateModule.acceptProject(lastI);
    //  Crete the proposal so that acceptLast just needs to accept all.
    console.log(
      `This is ${alice.meta['name']}'s account with pubkey ${alice.address}`
    );
    console.log('Waiting for tx to propose accept project to council');
    await createProposal(api, proposal, alice, i, eventList2);
  });
  return pr1;
}
