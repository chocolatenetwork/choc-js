import Project, { IProjectDbApi } from '$chocolate-frontend/models/Project';
import { mockApi } from '$chocolate-frontend/services/api/api';

interface IPatchProject {
  ratingSum?: number;
  reviewCount?: number;
  projectId: IProjectDbApi['projectId'];
}
async function patchProject(params: IPatchProject) {
  const { data } = await mockApi.patch<[IProjectDbApi]>('/projects', params);

  return Project.into(data[0]);
}

export { patchProject };
