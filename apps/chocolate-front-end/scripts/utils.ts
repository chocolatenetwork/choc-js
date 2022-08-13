import { ApiPromise } from '@polkadot/api';
import { ISubmittableResult } from '@polkadot/types/types';
import assert from 'assert';
import { parseEvent, CBs } from '../src/utils/parseEvent';
import { build } from './init-projects';
import { EventList } from './types';

export function assertAllGood(x: Awaited<ReturnType<typeof build>>) {
  const foundFailed = x[0].filter((x) => {
    return x.findIndex((y) => y?.[0] === 'Failed') !== -1;
  });
  const notGood = foundFailed.length;
  assert(
    notGood === 0,
    `Finished With ${notGood} Failed events: \n
    
    ${JSON.stringify(foundFailed, null, 2)}
    `
  );
}

export function handleEvents(
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
