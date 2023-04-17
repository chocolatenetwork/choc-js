import { makeSignaturePayload } from '@choc-js/database';
import Keyring from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import { signatureVerify } from '@polkadot/util-crypto';
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

it('generates signature', async () => {
  const data = {
    accountType: 'user',
    name: 'example-name',
    twitter: 'example-twitter',
  };
  const ring = new Keyring();
  const alice = ring.addFromUri('Alice');
  let signedData = '';
  const payload = await makeSignaturePayload({
    data,
    keys: Object.keys(data),
    async signRaw(data) {
      const raw = alice.sign(data);
      signedData = data;
      return { signature: u8aToHex(raw), address: alice.address };
    },
  });

  console.log(JSON.stringify(payload));
  const { isValid } = signatureVerify(
    signedData,
    payload.signature,
    payload.address
  );
  expect(isValid).toBe(true);
});
