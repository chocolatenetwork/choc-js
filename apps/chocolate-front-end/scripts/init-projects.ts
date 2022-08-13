/**@file Replace GEnesis config for chocolate pallet */

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { AccountId, EventRecord } from '@polkadot/types/interfaces';
import {
  ChocolatePrimitivesProjectsStatus,
  ParachainTemplateRuntimeCurrencyId,
} from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import { parseEvent } from '../src/utils/parseEvent';
import { METADATA } from './constants';

// Define aliases to make impl easier
// type AccountId = string;

export interface GenesisConfig {
  // Status of projects to create. if accept is included, accept after
  //   Rejected is depr
  initProjects: [Omit<ChocolatePrimitivesProjectsStatus['type'], 'Rejected'>][];
  // Users to create those projects with, and currencies to pay in.
  // Since this is after genesis, this can be any supported genesos
  initUsers: [string, ParachainTemplateRuntimeCurrencyId['type']][];
}

// Genesis build
// Initialise and accept all projects
async function build(self: GenesisConfig) {
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
