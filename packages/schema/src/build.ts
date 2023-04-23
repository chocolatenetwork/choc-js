import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { stringify } from 'safe-stable-stringify';
import * as TJS from 'typescript-json-schema';
import { throwIfErr } from './lib/util';
// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
};

const compilerOptions: TJS.CompilerOptions = {
  typeRoots: ['../../node_modules/@types'],
  strictNullChecks: true,
};

const schemas = [
  ['Project', 'project/project-schema.json'],
  ['ResourceLink', 'resource-link/resource-link-schema.json'],
  ['Review', 'review/review-schema.json'],
  ['User', 'user/user-schema.json'],
];

export function build(basePath: string): void {
  const program = TJS.getProgramFromFiles(
    [resolve(basePath, 'Schema.ts')],
    // Compiler options required from build to resolve typeroot.
    compilerOptions,
    basePath
  );

  const generator = TJS.buildGenerator(program, settings);

  if (!generator) {
    throw new Error('Genertor is null, a probably due to previous ts error');
  }
  // Get symbols for different types from generator.

  for (const [, schema] of schemas.entries()) {
    const [type, json] = schema;
    const obj = generator.getSchemaForSymbol(type);

    const objPath = resolve(__dirname, '../schemas', json);
    const dir = resolve(objPath, '../');
    mkdir(dir, { recursive: true })
      .then(() => {
        writeFile(objPath, stringify(obj, null, 2), 'utf-8').catch(throwIfErr);
      })
      .catch(throwIfErr);
  }
}

const basePath = resolve(__dirname, 'lib');
build(basePath);
