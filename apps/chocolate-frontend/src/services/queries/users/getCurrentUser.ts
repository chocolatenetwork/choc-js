import User, { IUserDb } from '$chocolate-frontend/models/User';
import { supabase } from '$chocolate-frontend/services/api/api';
import { getKeyring } from '$chocolate-frontend/utils/apiSetup/getKeyring';
import { AppError, ErrorCodes } from '$chocolate-frontend/utils/AppError';
import { AccountType } from '@choc-js/schema';

export async function getCurrentUser(): Promise<IUserDb> {
  const { selectedAccount } = getKeyring();

  const getResult = await supabase
    .from('user')
    .select('*')
    .filter('address', 'eq', selectedAccount.address)
    .limit(1);

  if (getResult.error) {
    throw new AppError('User not found', ErrorCodes.FetchUserError);
  }
  const [user] = getResult.data;
  if (!user) {
    throw new AppError('User not found', ErrorCodes.FetchUserError);
  }

  return User.into({
    ...user,
    accountType: user.accountType as AccountType,
  });
}
