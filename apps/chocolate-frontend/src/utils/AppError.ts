import { RegistryError } from '@polkadot/types/types';

// Numbers shouldn't be used with native enum,
export const ErrorCodes = {
  KeyringError: 1,
  ApiError: 2,
  ContractExecError: 3,
  // Both are handled the same
  FetchUserError: 4,
} as const;

export class AppError extends Error {
  readonly __marker = 'AppError';
  code: number;

  constructor(
    message: string,
    code = 0,
    public registryError?: RegistryError,
    options?: ErrorOptions
  ) {
    super(message);
    this.code = code;
  }
}
