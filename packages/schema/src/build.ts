import { resolve } from 'path';
import { writeFileSync } from 'fs';
import * as TJS from 'typescript-json-schema';
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
  const paths = schemas.map((e) => resolve(basePath, 'Schema.ts'));
  const program = TJS.getProgramFromFiles(paths, compilerOptions, basePath);

  for (const [i, schema] of schemas.entries()) {
    const [type, json] = schema;
    const obj = TJS.generateSchema(program, type, settings);
    writeFileSync(resolve(basePath, json), JSON.stringify(obj, null, 2), {
      encoding: 'utf-8',
    });
  }
}

const basePath = resolve(__dirname, 'lib');
build(basePath);