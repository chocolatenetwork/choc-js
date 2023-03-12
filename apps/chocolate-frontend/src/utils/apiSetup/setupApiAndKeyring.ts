import { curry1 } from '../curry1/curry1';
import { ExtractRest } from '../curry1/types';
import { getApiAndKeyring } from './getApiAndKeyring';
import { ApiKeyringFn } from './types';

export function setupApiAndKeyring<
  _Fn extends ApiKeyringFn,
  Rest extends ExtractRest<_Fn>
>(fn: _Fn): (...args: Rest) => ReturnType<_Fn> {
  return curry1(fn, getApiAndKeyring);
}
