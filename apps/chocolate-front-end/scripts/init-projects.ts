/**@file Replace GEnesis config for chocolate pallet */

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import {
  ChocolatePrimitivesProjectsStatus,
  ParachainTemplateRuntimeCurrencyId,
} from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import { parseEvent } from '../src/utils/parseEvent';
import { GenesisConfig } from './constants';

// Genesis build
// Initialise and accept all projects
export async function build(self: GenesisConfig) {
  // create users
  // Construct
  const wsProvider = new WsProvider('ws://127.0.0.1:8844');
  const api = await ApiPromise.create({ provider: wsProvider });
  const keyring = new Keyring({ type: 'sr25519' });
  //   Create users
  await createUsers(self, api, keyring);
}

async function createUsers(
  self: GenesisConfig,
  api: ApiPromise,
  keyring: Keyring
) {
  // create users
  const iter_users = self.initUsers.map((e) => e[0]);
  for (const id of iter_users) {
    const pair = keyring.addFromUri(id);
    console.log(
      `This is ${pair.meta['name']}'s account with pubkey ${pair.publicKey}`
    );

    const pr = await api.tx.usersModule
      .makeUser()
      .signAndSend(id, handleEvents(api));
    console.log('Finalised with hash:', pr);
  }
}

function handleEvents(api: ApiPromise) {
  return ({ events = [], txIndex }: ISubmittableResult) => {
    const res = events
      .filter(
        ({ phase }) =>
          phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(txIndex)
      )
      .map(({ event }) => parseEvent(api, event));
  };
}
