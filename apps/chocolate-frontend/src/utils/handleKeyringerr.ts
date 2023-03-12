import { keyringService } from '../services/machines/Keyring';
import { AppError, ErrorCodes } from './AppError';

export function handleKeyringerr(error: unknown) {
  if (error instanceof AppError && error.code === ErrorCodes.KeyringError) {
    keyringService.send('START');
  }
}
