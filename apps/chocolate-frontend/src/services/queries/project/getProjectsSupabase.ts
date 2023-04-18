import Project, { IProjectDb } from '$chocolate-frontend/models/Project';
import { supabase } from '$chocolate-frontend/services/api/api';

export async function getProjects(): Promise<IProjectDb[]> {
  const projectRes = await supabase.from('project').select('*');
  if (projectRes.error) {
    throw projectRes.error;
  }
  const { data } = projectRes;
  // const { data } = await mockApi.get<IProjectDbApi[]>('/projects');
  return Project.intoArray(data);
}
