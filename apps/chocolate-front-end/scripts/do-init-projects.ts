import { genesis } from './constants';
import { build } from './init-projects';
import { assertAllGood } from './utils';

async function doBuild() {
  const userEvents = await build(genesis);
  assertAllGood(userEvents);
  console.log('Finished with events:', JSON.stringify(userEvents, null, 2));
}

doBuild();
