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
  const wsProvider = new WsProvider('ws://127.0.0.1:8844');
  const api = await ApiPromise.create({ provider: wsProvider });
  const keyring = new Keyring({ type: 'sr25519' });
  //   Create users
  const eventList = await createUsers(self, api, keyring);

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
  for (const [i, id] of iter_users) {
    const pair = keyring.addFromUri(id);
    console.log(
      `This is ${pair.meta['name']}'s account with pubkey ${pair.publicKey}`
    );

    const pr = await api.tx.usersModule
      .makeUser()
      .signAndSend(id, handleEvents(api, [i, eventList]));
    console.log('Finalised with hash:', pr);
  }
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
