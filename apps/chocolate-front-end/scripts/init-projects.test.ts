import { genesis } from './constants';
import { build } from './init-projects';

describe('Ensure genesis drop-in works', () => {
  it('Builds Successfully', async () => {
    await build(genesis);
  });
});
