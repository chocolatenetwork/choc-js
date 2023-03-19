import { RegistryError } from '@polkadot/types/types';

// Numbers shouldn't be used with native enum,
export const ErrorCodes = {
  KeyringError: 1,
  ApiError: 2,
  ContractExecError: 3,
} as const;

export class AppError extends Error {
  readonly __marker = 'AppError';
  code: number;

  constructor(message: string, code = 0, public registryError?: RegistryError) {
    super(message);
    this.code = code;
  }
}
