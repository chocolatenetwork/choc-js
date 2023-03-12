import { setupApi } from '$chocolate-frontend/utils/apiSetup/setupApi';
import { defaultGasLimit } from '$chocolate-frontend/utils/defaultGasLimit';
import { QUERY_ACCOUNT } from '../constants';
import { AccountType } from './types';

interface GetInitiateVerificationFlowParams {
  accountType: AccountType;
  address?: string;
}
export default setupApi(
  async (ctx, params: GetInitiateVerificationFlowParams) => {
    const { accountType, address } = params;
    const { api: contract } = ctx;
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

    throw result.asErr;
  }
);
