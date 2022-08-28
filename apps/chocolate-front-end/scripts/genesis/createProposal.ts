import { ApiPromise } from '@polkadot/api';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { COUNCIL_LIMIT } from '../init-projects';
import { EventList } from '../types';
import { handleEvents } from '../utils';

export async function createProposal(
  api: ApiPromise,
  proposal: SubmittableExtrinsic<'promise', ISubmittableResult>,
  alice: KeyringPair,
  i: number,
  eventList2: EventList[]) {
  const pr2 = new Promise((res, rej) => {
    api.tx.council
      .propose(COUNCIL_LIMIT, proposal, proposal.encodedLength)
      .signAndSend(alice, handleEvents(api, [i, eventList2], res, rej));
  });
  await pr2;
}
