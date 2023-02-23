import { UseMutationResult } from '@tanstack/react-query';
import { AppError } from './AppError';
import { Any } from './curry1/types';

type AnyMutation = UseMutationResult<Any, Any, Any, Any>;
export function getErrorMsg<T extends AnyMutation>(muteResult: T) {
  const { error } = muteResult;
  if (error instanceof AppError) {
    return error.message;
  }
}
