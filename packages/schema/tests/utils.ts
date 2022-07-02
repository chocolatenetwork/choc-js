import { readdir } from 'fs/promises';
import { basename, resolve } from 'path';
import { Definition } from 'typescript-json-schema';

/** Get all schema in schema dir */
export async function extractSchema(dir: string): Promise<[Definition, string][]> {
  const schemadir = resolve(__dirname, '../schemas');
  const currentdir = resolve(schemadir, dir);
  const dircont = await readdir(currentdir);
  const jsonPaths = dircont.map((each) => resolve(currentdir, each));
  const jsons = jsonPaths.map(
    (each) =>
      [require(each), idFromBasename(basename(each))] as [Definition, string]
  );
  return jsons;
}

/** Extract the instances of a schema (from example dir) for testing */
export async function extractInstances(dir: string): Promise<[Record<string, any>, string][]> {
  const instancedir = resolve(__dirname, '../examples');
  const currentdir = resolve(instancedir, dir);
  const dircont = await readdir(currentdir);
  const jsonPaths = dircont.map((each) => resolve(currentdir, each));
  const jsons = jsonPaths.map((each) => {
    // could filter valid/invalids here.
    const instanceid = instIdFromBasename(basename(each));
    return [require(each), instanceid] as [Record<string, any>, string];
  });
  return jsons;
}

/**
 * Gets the name of a schema based on its filename by stripping the `-schema.json` part.
 * We assume that schema files are named in pattern:  `${id}-schema.json`
 * @example
 * ```js
 * const id =  idFromBasename('user-schema.json');
 * console.log(id=='user');
 * ```
 */
function idFromBasename(basename: string): string {
  return basename.split('-schema.json')[0];
}
/** Gets id of instance by splitting at `-instance.json`, same assumptions as `idFromBasename` */
function instIdFromBasename(basename: string): string {
  return basename.split('-instance.json')[0];
}
