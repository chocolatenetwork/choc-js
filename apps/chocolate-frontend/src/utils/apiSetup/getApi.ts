import { apiService } from '$chocolate-frontend/services/machines/Api';
import { ApiContext } from '$chocolate-frontend/services/machines/Api.schema';
import { AppError, ErrorCodes } from '$chocolate-frontend/utils/AppError';

export function _getApi(): ApiContext | null {
  const apiState = apiService.getSnapshot();

  if (apiState.matches('Connected')) return apiState.context;
  return null;
}
export function getApi(): ApiContext {
  const apiState = apiService.getSnapshot();

  if (apiState.matches('Connected')) return apiState.context;

  throw new AppError('Api::Error::No Api Connected', ErrorCodes.ApiError);
}
