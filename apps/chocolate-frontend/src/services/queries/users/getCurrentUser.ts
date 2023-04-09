import User, { IUserDb, IUserDbApi } from '$chocolate-frontend/models/User';
import { mockApi } from '$chocolate-frontend/services/api/api';
import { getKeyring } from '$chocolate-frontend/utils/apiSetup/getKeyring';
import { passThroughCatch } from '$chocolate-frontend/utils/passthrough';

export async function getCurrentUser(): Promise<IUserDb> {
  const { selectedAccount } = getKeyring();
  const params = new URLSearchParams([['accountId', selectedAccount.address]]);
  const getPromise = mockApi.get<IUserDbApi>(`/users`, { params });

  const dataPromise = getPromise
    .then((res) => res.data)
    .then(User.into)
    .catch(
      passThroughCatch((err) => {
        console.log(err);
      })
    );
  return dataPromise;
}
