import { setupApiAndKeyring } from '../../utils/apiSetup/setupApiAndKeyring';
import { getFromAcct } from '../../utils/getFromAcct';

export default setupApiAndKeyring(async (ctx, message: string) => {
  const { apiCtx, keyringCtx } = ctx;
  const { api } = apiCtx;
  // Todo: Extract to ctx.
  const acct = await getFromAcct(keyringCtx.selectedAccount);

  const signature = await api.api.sign(acct[0], { data: message });
  return signature;
});
