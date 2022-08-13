import assert from 'assert';
import { build } from './init-projects';

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
