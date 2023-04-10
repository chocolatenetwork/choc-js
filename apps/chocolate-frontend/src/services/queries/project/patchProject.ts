import Project, { IProjectDbApi } from '$chocolate-frontend/models/Project';
import { mockApi } from '$chocolate-frontend/services/api/api';

interface IPatchProject {
  ratingSum?: number;
  reviewCount?: number;
  id: IProjectDbApi['id'];
}
async function patchProject(params: IPatchProject) {
  const { id, ...body } = params;
  const { data } = await mockApi.patch<IProjectDbApi>(`/projects/${id}`, body);

  return Project.into(data);
}

export { patchProject };
