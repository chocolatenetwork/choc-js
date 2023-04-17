import Project, {
  IProjectDb,
  IProjectDbApi,
} from '$chocolate-frontend/models/Project';
import { mockApi } from '$chocolate-frontend/services/api/api';

export async function getProjects(): Promise<IProjectDb[]> {
  const { data } = await mockApi.get<IProjectDbApi[]>('/projects');
  return Project.intoArray(data);
}
