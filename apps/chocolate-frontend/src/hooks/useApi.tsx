import { useActor } from '@xstate/react';
import { apiService } from '../services/machines/Api';
import { ApiContext } from '../services/machines/Api.schema';
import { AppError } from '../utils/AppError';

export function _useApi(): ApiContext | null {
  const [apiState] = useActor(apiService);

  if (apiState.matches('Connected')) return apiState.context;
  return null;
}
/**
 * useApi hook.
 *
 * # Throws
 *
 * This function throws if the api is not available, the error should be handled at the top.
 */
export function useApi(): ApiContext {
  const [apiState] = useActor(apiService);

  if (apiState.matches('Connected')) return apiState.context;

  throw new AppError('Api::Error::No Api Connected');
}


