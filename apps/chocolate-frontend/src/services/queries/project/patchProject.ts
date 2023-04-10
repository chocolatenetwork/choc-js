import Project, { IProjectDbApi } from '$chocolate-frontend/models/Project';
import { mockApi } from '$chocolate-frontend/services/api/api';

interface IPatchProject {
  ratingSum?: number;
  reviewCount?: number;
  projectId: IProjectDbApi['id'];
}
async function patchProject(params: IPatchProject) {
  const { projectId, ...body } = params;
  const searchParams = new URLSearchParams([['id', String(projectId)]]);
  const { data } = await mockApi.patch<[IProjectDbApi]>('/projects', body, {
    params: searchParams,
  });

  return Project.into(data[0]);
}

export { patchProject };
