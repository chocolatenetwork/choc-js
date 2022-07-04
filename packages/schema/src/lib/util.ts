import { exit } from 'process';

export function throwIfErr(e: any) {
  if (e) {
    console.error(e);
    exit(1);
  }
}
