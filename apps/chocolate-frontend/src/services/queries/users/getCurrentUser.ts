import User, { IUserDb, IUserDbApi } from '$chocolate-frontend/models/User';
import { mockApi } from '$chocolate-frontend/services/api/api';
import { getKeyring } from '$chocolate-frontend/utils/apiSetup/getKeyring';
import { AppError, ErrorCodes } from '$chocolate-frontend/utils/AppError';

export async function getCurrentUser(): Promise<IUserDb> {
  const { selectedAccount } = getKeyring();
  const params = new URLSearchParams([['id', selectedAccount.address]]);
  const getPromise = mockApi.get<[IUserDbApi]>(`/users`, { params });

  const dataPromise = getPromise
    .then((res) => res.data.at(0))
    .then((user) => {
      const userDb: IUserDbApi | undefined = user;
      checkUser(userDb);
      return userDb;
    })
    .then(User.into);

  return dataPromise;
}
// This would ideally check api
function checkUser<T>(user: T): asserts user is NonNullable<T> {
  if (!user) {
    throw new AppError('User not found', ErrorCodes.FetchUserError);
  }
}