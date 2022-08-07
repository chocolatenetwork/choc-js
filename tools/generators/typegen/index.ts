import {
  Tree,
  formatFiles,
  readProjectConfiguration,
  generateFiles,
} from '@nrwl/devkit';
import { join } from 'path';
import { w3cwebsocket as WebSocket } from 'websocket';

async function fetchMetadata() {
  const endpoint = 'ws://127.0.0.1:8844';
  console.log('Connecting to ', endpoint);
  const ws = new WebSocket(endpoint);
  const promis = new Promise<string>((res, rej) => {
    ws.onopen = (): void => {
      ws.send(
        '{"id":"1","jsonrpc":"2.0","method":"state_getMetadata","params":[]}'
      );
    };
    ws.onmessage = (msg: any): void => {
      const metadata = JSON.parse(msg.data).result;
      // fs.writeFileSync('packages/types/src/metadata/static-latest.ts', `export default '${metadata}'`);
      res(metadata as string);
      ws.close();
    };
  });
  const metadata = await promis;
  return metadata;
}
interface ModWithRpc {
  name: string;
  rpc: Record<string, string>;
}
const mods: (string | ModWithRpc)[] = ['chocolateModule', 'usersModule'];

// Todo: Rework to do the following:
//  1. (highest priority), run typegen on types using low level functions to take advantage of nx's cache system
//  Idea: Trigger via a spawn call that runs said commands. See if it helps caching.
//  Also run metadata update via this command
//  Problem with 2&3 below: will need to be tweaked for rpc. WON'T FIX.
//  2. Update interfaces folder of types with a folder of structure: __modulename__/definitions.ts which imports __modulename__ from @choc-js/definitions and reexports as Definitions
//  3. Update Definition.ts of types with export {default as __modulename__} from ./__modulename__/definitons.ts
export default async function (tree: Tree, schema: any) {
  // Don't create a library
  const libraryRoot = readProjectConfiguration(tree, schema.name).root;
  // First, update metadata.ts in the types library
  const metadata = await fetchMetadata();
  generateFiles(
    tree,
    join(__dirname, 'files/static'),
    join(libraryRoot, 'static'),
    {
      tmpl: '',
      metadata,
    }
  );
  // Then update type defs
  // Will need to separate outer definitions from mod definitions. It's being regenerated on each run.
  for (let modname of mods) {
    let rpc = {};
    if (typeof modname !== 'string') rpc = modname.rpc;
    generateFiles(
      tree,
      join(__dirname, 'files/src/interfaces'),
      join(libraryRoot, 'src/interfaces'),
      {
        tmpl: '',
        modname,
        mods,
        types: JSON.stringify({}),
        rpc: JSON.stringify(rpc),
      }
    );
  }
  await formatFiles(tree);
  return () => {
    // installPackagesTask(tree);
  };
}
