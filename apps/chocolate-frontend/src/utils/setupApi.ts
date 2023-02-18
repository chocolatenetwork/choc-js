import { ApiContext } from '../services/machines/Api.schema';
import { getApi } from './getApi';
import { getKeyring, NonNullKeyringContext } from './getKeyring';

export interface ApiKeyringContext {
  keyringCtx: NonNullKeyringContext;
  apiCtx: ApiContext;
}
// Types...
type Fn<Args, Return> = (...args: Args[]) => Return;
type Fn1<Arg0, Return> = (arg0: Arg0, ...args: any) => Return;
type ApiFn = (context: ApiContext, ...args: any[]) => Promise<unknown>;
type KeyringFn = (
  context: NonNullKeyringContext,
  ...args: any[]
) => Promise<unknown>;

type ApiKeyringFn = (
  bothContext: ApiKeyringContext,
  ...args: any[]
) => Promise<unknown>;

type ExtractRest<_Fn extends Fn<any, any>> = _Fn extends (
  a0: any,
  ...args: infer T
) => any
  ? T
  : any;

// ...Fns
export function setupApi<_Fn extends ApiFn, Rest extends ExtractRest<_Fn>>(
  apifn: _Fn
): (...args: Rest) => ReturnType<_Fn> {
  const apiCtx = getApi();

  return (...args: Rest): ReturnType<_Fn> => {
    return apifn(apiCtx, ...args) as ReturnType<_Fn>;
  };
}
export function setupKeyring<
  _Fn extends KeyringFn,
  Rest extends ExtractRest<_Fn>
>(apifn: _Fn): (...args: Rest) => ReturnType<_Fn> {
  const keyringCtx = getKeyring();

  return (...args: Rest): ReturnType<_Fn> => {
    return apifn(keyringCtx, ...args) as ReturnType<_Fn>;
  };
}

export function setupApiAndKeyring<
  _Fn extends ApiKeyringFn,
  Rest extends ExtractRest<_Fn>
>(fn: _Fn): (...args: Rest) => ReturnType<_Fn> {
  const keyringCtx = getKeyring();
  const apiCtx = getApi();

  return (...args: Rest): ReturnType<_Fn> => {
    return fn({ apiCtx, keyringCtx }, keyringCtx, ...args) as ReturnType<_Fn>;
  };
}
