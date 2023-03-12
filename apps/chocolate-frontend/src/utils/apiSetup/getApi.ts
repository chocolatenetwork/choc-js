import { apiService } from '$chocolate-frontend/services/machines/Api';
import { AppError, ErrorCodes } from '$chocolate-frontend/utils/AppError';

export function _getApi() {
  const apiState = apiService.getSnapshot();

  if (apiState.matches('Connected')) return apiState.context;
  return null;
}
export function getApi() {
  const apiState = apiService.getSnapshot();

  if (apiState.matches('Connected')) return apiState.context;

  throw new AppError('Api::Error::No Api Connected', ErrorCodes.ApiError);
}
