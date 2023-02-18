import { InjectedAccountWithMeta } from '../services/api/types';
import { keyringService } from '../services/machines/Keyring';
import { KeyringContext } from '../services/machines/Keyring.schema';
import { AppError } from './AppError';

export interface NonNullKeyringContext extends KeyringContext {
  selectedAccount: InjectedAccountWithMeta;
}
export function _getKeyring(): KeyringContext {
  const keyringState = keyringService.getSnapshot();
  return keyringState.context;
}
export function getKeyring(): NonNullKeyringContext {
  const keyringState = keyringService.getSnapshot();
  if (keyringState.matches('Selected')) {
    return keyringState.context as NonNullKeyringContext;
  }

  throw new AppError('Keyring::Error::There is no loaded account');
}
