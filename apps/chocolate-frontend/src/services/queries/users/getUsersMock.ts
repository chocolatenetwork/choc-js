import User, { IUserDb, IUserDbApi } from '$chocolate-frontend/models/User';
import { mockApi } from '$chocolate-frontend/services/api/api';

export async function getUsersMock(): Promise<IUserDb[]> {
  const { data } = await mockApi.get<IUserDbApi[]>(`/users`);

  return User.intoArray(data);
}
