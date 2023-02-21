import { ApiContext } from '../../services/machines/Api.schema';
import { Fn1 } from '../curry1/types';
import { GetFromAcctReturn } from '../getFromAcct';
import { NonNullKeyringContext } from '../getKeyring';

export interface ApiKeyringContext {
  keyringCtx: NonNullKeyringContext;
  apiCtx: ApiContext;
}
export interface ApiKeyringAcctContext {
  keyringCtx: NonNullKeyringContext;
  apiCtx: ApiContext;
  acctCtx: GetFromAcctReturn;
}
export type ApiFn = Fn1<ApiContext, unknown>;
export type KeyringFn = Fn1<NonNullKeyringContext, unknown>;
export type ApiKeyringFn = Fn1<ApiKeyringContext, unknown>;
export type AsyncApiKeyringFn = Fn1<Promise<ApiKeyringAcctContext>, unknown>;
