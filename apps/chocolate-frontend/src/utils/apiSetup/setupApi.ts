import { curry1 } from '../curry1/curry1';
import { ExtractRest } from '../curry1/types';
import { getApi } from '../getApi';
import { ApiFn } from './types';

export function setupApi<_Fn extends ApiFn, Rest extends ExtractRest<_Fn>>(
  fn: _Fn
): (...args: Rest) => ReturnType<_Fn> {
  const apiCtx = getApi();

  return curry1(fn, apiCtx);
}
