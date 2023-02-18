import { curry1 } from '../curry1/curry1';
import { ExtractRest } from '../curry1/types';
import { getApi } from '../getApi';
import { getKeyring } from '../getKeyring';
import { ApiKeyringContext, ApiKeyringFn } from './types';

export function setupApiAndKeyring<
  _Fn extends ApiKeyringFn,
  Rest extends ExtractRest<_Fn>
>(fn: _Fn): (...args: Rest) => ReturnType<_Fn> {
  const keyringCtx = getKeyring();
  const apiCtx = getApi();
  const ctx: ApiKeyringContext = { apiCtx, keyringCtx };

  return curry1(fn, ctx);
}
