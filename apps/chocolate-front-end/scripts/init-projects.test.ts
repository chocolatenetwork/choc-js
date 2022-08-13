import { genesis } from './constants';
import { build } from './init-projects';
import type { EvType } from '../src/utils/parseEvent';
describe('Ensure genesis drop-in works', () => {
  it('Builds Successfully', async () => {
   const userEvents = await build(genesis);
   userEvents[0].forEach((ev) => {
     expect(ev[0]).toBe<EvType>('Success');
   });
  });
});
