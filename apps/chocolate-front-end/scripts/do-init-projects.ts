import { genesis } from './constants';
import { build } from './init-projects';

async function doBuild() {
  const userEvents = await build(genesis);
  console.log('Finished with events:', JSON.stringify(userEvents));
}

doBuild();
