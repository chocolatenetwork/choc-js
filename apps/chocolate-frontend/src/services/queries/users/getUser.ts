import User, { IUserDb, IUserDbApi } from '$chocolate-frontend/models/User';
import { mockApi } from '$chocolate-frontend/services/api/api';

interface IGetUser {
  id: string;
}
export async function getUser({ id }: IGetUser): Promise<IUserDb> {
  const params = new URLSearchParams([['id', id]]);
  const { data } = await mockApi.get<IUserDbApi>(`/users`, { params });

  return User.into(data);
}
