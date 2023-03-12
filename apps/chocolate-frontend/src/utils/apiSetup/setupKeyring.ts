import { curry1 } from '../curry1/curry1';
import { ExtractRest } from '../curry1/types';
import { getKeyring } from './getKeyring';
import { KeyringFn } from './types';

export function setupKeyring<
  _Fn extends KeyringFn,
  Rest extends ExtractRest<_Fn>
>(fn: _Fn): (...args: Rest) => ReturnType<_Fn> {
  return curry1(fn, getKeyring);
}
