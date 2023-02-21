import { getApi } from '../getApi';
import { getKeyring } from '../getKeyring';
import { ApiKeyringContext } from './types';

export function getApiAndKeyring(): ApiKeyringContext {
  const keyringCtx = getKeyring();
  const apiCtx = getApi();
  const ctx: ApiKeyringContext = { apiCtx, keyringCtx };
  return ctx;
}
