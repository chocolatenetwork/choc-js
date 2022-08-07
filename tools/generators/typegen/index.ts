import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  generateFiles,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
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

export default async function (tree: Tree, schema: any) {
  // Don't create a library
  const libraryRoot = readProjectConfiguration(tree, schema.name).root;
  // First, update metadata.ts in the types library
  const metadata = await fetchMetadata();
  generateFiles(tree, join(__dirname, 'files'), libraryRoot, {
    tmpl: '',
    metadata,
  });
  return () => {
    installPackagesTask(tree);
  };
}
