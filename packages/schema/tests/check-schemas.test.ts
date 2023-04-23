import Ajv, { Schema } from 'ajv';
import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { extractInstances, extractSchema } from './utils';

describe('Ensure schema works for valid instances', () => {
  it('Should be valid schema', async () => {
    // Fetch all schema
    const schemadir = resolve(__dirname, '../schemas');
    const dirs = await readdir(schemadir);
    const schemas = await Promise.all(dirs.map(extractSchema));
    const ajv = new Ajv();
    // and Check them
    schemas.forEach((schemaGrp) => {
      schemaGrp.forEach(([schema]) => {
        const isValid = ajv.validateSchema(schema as Schema);
        expect(isValid).toBe(true);
      });
    });
  });

  it('Should work for valid instances', async () => {
    const schemadir = resolve(__dirname, '../schemas');
    const dirs = await readdir(schemadir);

    // fetch schema
    for (const dir of dirs) {
      const schemas = await extractSchema(dir);
      const instances = await extractInstances(dir);
      const ajv = new Ajv();

      // fetch schema instances
      schemas.forEach(([schema, id]) => {
        const validate = ajv.compile(schema as Schema);
        const testCases = instances.filter(([, _id]) => id === _id);

        // ensure instances match
        testCases.forEach(([t]) => {
          const isValid = validate(t);
          if (!isValid) console.log(validate.errors);
          expect(isValid).toBe(true);
        });
      });
    }
  });
});
