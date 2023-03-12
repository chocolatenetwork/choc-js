import { setupApi } from '$chocolate-frontend/utils/apiSetup/setupApi';
import { AccountType } from './putVerifyUser';

const QUERY_ACCOUNT = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
interface GetInitiateVerificationFlowParams {
  accountType: AccountType;
  address?: string;
}
export default setupApi(
  async (ctx, params: GetInitiateVerificationFlowParams) => {
    const { accountType, address } = params;
    const { api: contract } = ctx;
    const { api } = contract;
    const gasLimit = api.registry.createType('WeightV2', {
      refTime: 300000000000n,
      proofSize: 262144,
    });

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
