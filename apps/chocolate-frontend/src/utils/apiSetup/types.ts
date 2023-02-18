import { ApiContext } from '../../services/machines/Api.schema';
import { Fn1 } from '../curry1/types';
import { NonNullKeyringContext } from '../getKeyring';

export interface ApiKeyringContext {
  keyringCtx: NonNullKeyringContext;
  apiCtx: ApiContext;
}
export type ApiFn = Fn1<ApiContext, Promise<unknown>>;
export type KeyringFn = Fn1<NonNullKeyringContext, Promise<unknown>>;
export type ApiKeyringFn = Fn1<ApiKeyringContext, Promise<unknown>>;
