import User, { IUserDb } from '$chocolate-frontend/models/User';
import { supabase } from '$chocolate-frontend/services/api/api';
import { AppError } from '$chocolate-frontend/utils/AppError';
import { KeyMap } from '$chocolate-frontend/utils/toConverter';
import { AccountType } from '@choc-js/schema';

export async function getUsers(): Promise<KeyMap<IUserDb>> {
  const getResponse = await supabase.from('user').select('*');
  if (getResponse.error) {
    throw new AppError('Get Users error', undefined, undefined, {
      cause: getResponse.error,
    });
  }
  const { data } = getResponse;
  return User.intoDictWithMap(data, (value) => {
    return {
      ...value,
      accountType: value.accountType as AccountType,
    };
  });
}
