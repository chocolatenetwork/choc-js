import { setupApi } from '$chocolate-frontend/utils/apiSetup/setupApi';
import { defaultGasLimit } from '$chocolate-frontend/utils/defaultGasLimit';
import { hexToU8a } from '@polkadot/util';
import { QUERY_ACCOUNT } from '../constants';

interface GetVerifySignatureParams {
  /** signature as hex */
  signature: string;
  addressToVerify?: string;
  authorityAddress?: string;
}

export default setupApi(async (ctx, params: GetVerifySignatureParams) => {
  const { contract } = ctx;
  const { signature, authorityAddress, addressToVerify } = params;
  const gasLimit = defaultGasLimit(contract.api);
  const byteArraySignature = hexToU8a(signature);
  const rawResult = await contract.query.verifyIdentityResponse(
    authorityAddress || QUERY_ACCOUNT,
    {
      gasLimit,
    },
    byteArraySignature,
    addressToVerify
  );

  const { result } = rawResult;
  if (result.isOk) {
    return { data: result.asOk.data, rawResult };
  }
  throw result.asErr;
});
