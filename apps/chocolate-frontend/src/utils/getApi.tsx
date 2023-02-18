import { apiService } from '../services/machines/Api';
import { AppError } from './AppError';

export function _getApi() {
  const apiState = apiService.getSnapshot();

  if (apiState.matches('Connected')) return apiState.context;
  return null;
}
export function getApi() {
  const apiState = apiService.getSnapshot();

  if (apiState.matches('Connected')) return apiState.context;

  throw new AppError('Api::Error::No Api Connected');
}
