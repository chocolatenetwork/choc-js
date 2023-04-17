import { getApi } from '$chocolate-frontend/utils/apiSetup/getApi';
import { AppError, ErrorCodes } from '$chocolate-frontend/utils/AppError';
import { defaultGasLimit } from '$chocolate-frontend/utils/defaultGasLimit';
import { findError, formatRegistryError } from '../../../utils/findError';
import { QUERY_ACCOUNT } from '../constants';
import { AccountType } from './types';

interface GetInitiateVerificationFlowParams {
  accountType: AccountType;
  address?: string;
}
export default async function (params: GetInitiateVerificationFlowParams) {
  const ctx = getApi();
  const { address } = params;
  const { contract } = ctx;
  const { api } = contract;
  const gasLimit = defaultGasLimit(api);

  const queryResult = await contract.query.initiateVerficationFlow(
    address || QUERY_ACCOUNT,
    {
      gasLimit,
      storageDepositLimit: null,
      value: 0,
    }
  );
  const { result } = queryResult;
  if (result.isOk) {
    const okResult = result.asOk;
    return { result: okResult.data, rawResult: queryResult };
  }

  const error = findError(contract.api, result);
  throw new AppError(
    formatRegistryError(error),
    ErrorCodes.ContractExecError,
    error
  );
}
