import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  // Don't create a library
  await libraryGenerator(tree, { name: schema.name });
  await formatFiles(tree);
  // First, update metadata.json in the types library
  return () => {
    installPackagesTask(tree);
  };
}
