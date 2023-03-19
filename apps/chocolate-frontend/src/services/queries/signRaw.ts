import { getFromAcct } from '$chocolate-frontend/utils/apiSetup/getFromAcct';
import { setupKeyring } from '$chocolate-frontend/utils/apiSetup/setupKeyring';
import { GetFromAcctReturn } from '$chocolate-frontend/utils/apiSetup/types';
import { AppError } from '$chocolate-frontend/utils/AppError';
import { maybeStringToHex } from '../../utils/maybeStringToHex';

/** Takes a (possibly) hex encoded string and signs it. */
export default setupKeyring(async (ctx, message: string) => {
  const { selectedAccount } = ctx;
  // Todo: Extract to ctx.
  const acct: GetFromAcctReturn = await getFromAcct(selectedAccount);
  const [address, { signer }] = acct;
  if (!signer.signRaw) throw new AppError('Cannot sign with current extension');
  const result = await signer.signRaw({
    address: address,
    data: maybeStringToHex(message),
    type: 'bytes',
  });

  // const signature = await api.api.sign(acct[0], { data: message }, acct[1]);
  const { signature } = result;
  return signature;
});
