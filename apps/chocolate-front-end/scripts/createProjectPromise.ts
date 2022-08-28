import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { BN } from '@polkadot/util';
import { EventList } from './types';
import { handleEvents } from './utils';

export function createProjectPromise(
  api: ApiPromise,
  meta: string,
  pair: KeyringPair,
  i: number,
  eventList: EventList[]) {
  const pr1 = new Promise((res, rej) => {
    api.tx.chocolateModule
      .createProject(meta)
      .signAndSend(pair, handleEvents(api, [i, eventList], res, rej));
  }).then(async () => {
    const nextIP = await api.query.chocolateModule.nextProjectIndex();
    const nextI = nextIP.unwrap();
    const lastI = nextI.sub(new BN(1));
    return lastI;
  });
  return pr1;
}
