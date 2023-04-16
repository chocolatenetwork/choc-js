import { AppDataSource } from '../data-source';

it('connects', async () => {
  await AppDataSource.initialize().then(async (db) => {
    const results = [
      db.query('select * from review'),
      db.query('select * from project'),
      db.query('select * from user'),
    ];
    const result = await Promise.all(results);
    console.log(result);
  });
});
