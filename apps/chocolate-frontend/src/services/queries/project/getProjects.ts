import Project, {
  IProjectDb,
  IProjectDbApi,
} from '$chocolate-frontend/models/Project';
import { supabase } from '$chocolate-frontend/services/api/api';

export async function getProjects(): Promise<IProjectDb[]> {
  const projectRes = await supabase.from('project_view').select('*');
  if (projectRes.error) {
    throw projectRes.error;
  }
  const { data } = projectRes;
  return Project.intoArray(data as IProjectDbApi[]);
}
