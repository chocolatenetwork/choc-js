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

// optionally pass a base path
const schemas = [
  ['project/Project.ts', 'Project', 'project/project-schema.json'],
  [
    'resource-link/ResourceLink.ts',
    'ResourceLink',
    'resource-link/resource-link-schema.json',
  ],
  ['Review/Review.ts', 'Review', 'Review/review-schema.json'],
  ['User/BaseUser.ts', 'BaseUser', 'User/base-user-schema.json'],
  [
    'User/ProjectAdminUser.ts',
    'ProjectAdminUser',
    'User/project-admin-user-schema.json',
  ],
  ['User/RegularUser.ts', 'RegularUser', 'User/regular-user-schema.json'],
];

export function schema(basePath:string): void {
  const paths = schemas.map((e) => resolve(basePath, e[0]));
  const program = TJS.getProgramFromFiles(paths, compilerOptions, basePath);
  // We can either get the schema for one file and one type...

  for (const [i, schema] of schemas.entries()) {
    const [_, type, json] = schema;
    const obj = TJS.generateSchema(program, type, settings);
    writeFileSync(resolve(basePath, json), JSON.stringify(obj, null, 2), {
      encoding: 'utf-8',
    });
  }
}

const basePath = resolve(__dirname, 'lib');
schema(basePath);