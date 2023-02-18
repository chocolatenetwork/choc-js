import { useActor } from '@xstate/react';
import { keyringService } from '../services/machines/Keyring';
import { KeyringContext } from '../services/machines/Keyring.schema';
import { AppError } from '../utils/AppError';
import { NonNullKeyringContext } from '../utils/getKeyring';

export function _useKeyring(): KeyringContext {
  const [state] = useActor(keyringService);
  return state.context as NonNullKeyringContext;
}

export function useKeyring(): NonNullKeyringContext {
  const [state] = useActor(keyringService);
  if (state.matches('Selected')) {
    return state.context as NonNullKeyringContext;
  }

  throw new AppError('Keyring::Error::There is no loaded account');
}
