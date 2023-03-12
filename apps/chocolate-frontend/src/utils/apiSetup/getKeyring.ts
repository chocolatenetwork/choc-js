import { InjectedAccountWithMeta } from '$chocolate-frontend/services/api/types';
import { keyringService } from '$chocolate-frontend/services/machines/Keyring';
import { KeyringContext } from '$chocolate-frontend/services/machines/Keyring.schema';
import { AppError, ErrorCodes } from '$chocolate-frontend/utils/AppError';

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

  const message = 'Keyring::Error::There is no loaded account';
  throw new AppError(message, ErrorCodes.KeyringError);
}
