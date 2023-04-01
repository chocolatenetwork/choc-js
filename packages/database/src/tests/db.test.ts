import { AppDataSource } from '../data-source';

it('connects', async () => {
  await AppDataSource.initialize().then(async (db) => {
    const p = db.query('select * from review');
    const p2 = await p;
    console.log(p2);
  });
});
