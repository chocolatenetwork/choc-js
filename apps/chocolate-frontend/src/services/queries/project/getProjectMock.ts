import Project, {
  IProjectDb,
  IProjectDbApi,
} from '$chocolate-frontend/models/Project';
import { mockApi } from '$chocolate-frontend/services/api/api';

export async function getProjectMock(id: string): Promise<IProjectDb> {
  const params = new URLSearchParams([['id', id]]);

  const { data } = await mockApi.get<[IProjectDbApi]>(`/projects`, { params });
  return Project.into(data[0]);
}
