import { ApiPromise } from '@polkadot/api';
import { ISubmittableResult } from '@polkadot/types/types';
import assert from 'assert';
import { CBs, parseEvent } from '../src/utils/parseEvent';
import { build } from './init-projects';
import { EventList } from './types';

export function assertAllGood(x: Awaited<ReturnType<typeof build>>) {
  const all = [...x[0], ...x[1]];
  const foundFailed = all.filter((x) => {
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

/**
 * Logs out events and adds them to an event list as they are captured at the index specified.
 */
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
export function verifyAllSettled(
  pr: PromiseSettledResult<unknown>[]
): Promise<void> {
  return new Promise<void>((res, rej) => {
    const allCompleted = pr.every((each) => each.status === 'fulfilled');
    if (allCompleted) {
      console.log('All promises passed from previous');
      res();
    } else {
      console.log('Not All promises passed from previous');
      rej();
    }
  });
}
