import Project, { IProjectDb } from '$chocolate-frontend/models/Project';
import { supabase } from '$chocolate-frontend/services/api/api';

export async function getProject(id: string): Promise<IProjectDb> {
  const projectRes = await supabase.from('project').select('*').eq('id', id);
  if (projectRes.error) {
    throw projectRes.error;
  }
  const [data] = projectRes.data;

  return Project.into(data);
}
