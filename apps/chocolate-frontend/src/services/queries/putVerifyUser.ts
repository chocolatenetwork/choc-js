import { setupApiAndKeyring } from '../../utils/apiSetup/setupApiAndKeyring';
import { getFromAcct } from '../../utils/getFromAcct';

export enum AccountType {
  Project = 'Project',
  User = 'User',
}
// Todo: Finalise structure
export default setupApiAndKeyring(async (ctx, accountType: AccountType) => {
  const { apiCtx, keyringCtx } = ctx;
  const { api } = apiCtx;
  // Todo: Extract to ctx.
  const acct = await getFromAcct(keyringCtx.selectedAccount);

  // const promise = new Promise((res, rej) => {
  //   const executable = api.tx.setMessage({}, [accountType]);
  //   executable.signAndSend(...acct, (res) => {});
  // });
  // await promise;
  // const promise2 = new Promise((res, rej) => {
  //   return api.query.getMessage(keyringCtx.selectedAccount.address, {});
  // });
  // await promise2;
  return acct[0]; //Return account's addr as stub
});
