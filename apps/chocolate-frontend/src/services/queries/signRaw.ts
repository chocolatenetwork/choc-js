import { setupKeyring } from '$chocolate-frontend/utils/apiSetup/setupKeyring';
import { AppError } from '$chocolate-frontend/utils/AppError';
import { stringToHex } from '@polkadot/util';
import { getFromAcct } from '../../utils/getFromAcct';
import { GetFromAcctReturn } from '../../utils/GetFromAcctReturn';

export default setupKeyring(async (ctx, message: string) => {
  const { selectedAccount } = ctx;
  // Todo: Extract to ctx.
  const acct: GetFromAcctReturn = await getFromAcct(selectedAccount);
  const [address, { signer }] = acct;

  if (!signer.signRaw) throw new AppError('Cannot sign with current extension');
  const result = await signer.signRaw({
    address: address,
    data: stringToHex(message),
    type: 'bytes',
  });

  // const signature = await api.api.sign(acct[0], { data: message }, acct[1]);
  const { signature } = result;
  return signature;
});
