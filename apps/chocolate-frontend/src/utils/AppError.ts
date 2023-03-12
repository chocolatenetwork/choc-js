// Numbers shouldn't be used with native enum,
export const ErrorCodes = {
  KeyringError: 1,
  ApiError: 2,
} as const;

export class AppError extends Error {
  readonly __marker = 'AppError';
  code: number;

  constructor(message: string, code = 0) {
    super(message);
    this.code = code;
  }
}
