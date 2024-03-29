import { mkdir, writeFile } from 'fs/promises';
import stringify from 'json-stable-stringify';
import { resolve } from 'path';
import * as TJS from 'typescript-json-schema';
import { throwIfErr } from './lib/util';
// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};

const schemas = [
  ['Project', 'project/project-schema.json'],
  ['ResourceLink', 'resource-link/resource-link-schema.json'],
  ['Review', 'review/review-schema.json'],
  ['BaseUser', 'user/base-user-schema.json'],
  ['ProjectAdminUser', 'user/project-admin-user-schema.json'],
  ['RegularUser', 'user/regular-user-schema.json'],
];

export function build(basePath: string): void {
  const paths = [resolve(basePath, 'Schema.ts')];
  const program = TJS.getProgramFromFiles(paths, compilerOptions, basePath);

  for (const [, schema] of schemas.entries()) {
    const [type, json] = schema;
    const obj = TJS.generateSchema(program, type, settings);
    const objPath = resolve(__dirname, '../schemas', json);
    const dir = resolve(objPath, '../');
    mkdir(dir, { recursive: true })
      .then(() => {
        writeFile(objPath, stringify(obj, { space: 2 }), 'utf-8').catch(
          throwIfErr
        );
      })
      .catch(throwIfErr);
  }
}

const basePath = resolve(__dirname, 'lib');
build(basePath);
