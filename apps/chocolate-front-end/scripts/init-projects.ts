/**@file Replace GEnesis config for chocolate pallet */

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';

import { ISubmittableResult } from '@polkadot/types/types';
import { CBs, parseEvent } from '../src/utils/parseEvent';
import { GenesisConfig } from './constants';

// Genesis build
// Initialise and accept all projects
export async function build(
  self: GenesisConfig
): Promise<[userEvents: EventList[]]> {
  // create users
  // Construct
  const wsProvider = new WsProvider('ws://127.0.0.1:8845');
  const api = await ApiPromise.create({ provider: wsProvider });
  //   Create users
  const keyring = new Keyring({ type: 'sr25519' });
  const eventList = await createUsers(self, api, keyring);

  api.disconnect();
  return [eventList];
}

async function createUsers(
  self: GenesisConfig,
  api: ApiPromise,
  keyring: Keyring
) {
  // create users
  const iter_users = self.initUsers.map((e) => e[0]).entries();
  const eventList: EventList[] = [];
  const prList = [];
  for (const [i, derPath] of iter_users) {
    const [, ...nameSec] = derPath.split('//');
    const pair = keyring.addFromUri(derPath, {
      name: `${nameSec.join(' ')} default`,
    });
    console.log(
      `This is ${pair.meta['name']}'s account with pubkey ${pair.publicKey}`
    );
    console.log('Waiting for tx');
    const pr = new Promise((res, rej) => {
      api.tx.usersModule
        .makeUser()
        .signAndSend(pair, handleEvents(api, [i, eventList], res, rej));
    });
    prList.push(pr);
  }
  await Promise.all(prList).catch((why) =>
    console.log('All stopped, this is why', why)
  );
  // console.log('Finalised with hash:', pr);
  // await pr.catch((a) => console.log(a));
  return eventList;
}

type EventList = ReturnType<typeof parseEvent>[];
function handleEvents(
  api: ApiPromise,
  resList: [number, EventList[]],
  ...callbacks: CBs
) {
  return ({ events = [], txIndex }: ISubmittableResult) => {
    const res = events
      .filter(
        ({ phase }) =>
          phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(txIndex)
      )
      .map(({ event }) => parseEvent(api, event, ...callbacks));
    const [i] = resList;
    resList[1][i] = res;
  };
}
