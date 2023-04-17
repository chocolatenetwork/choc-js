import { getProjects } from '$chocolate-frontend/services/queries/project/getProjects';
import { useQuery } from '@tanstack/react-query';
import { ProjectsError } from './Projects.error';
import { ProjectsLoading } from './Projects.loading';
import { ProjectsBody } from './ProjectsBody/ProjectsBody';

export function Projects() {
  // query projects.
  const projectsQuery = useQuery({
    queryFn: getProjects,
    queryKey: ['Projects'],
  });
  if (projectsQuery.isLoading) return <ProjectsLoading />;
  if (projectsQuery.isError) return <ProjectsError />;
  // pass listing to ProjectsBody
  return <ProjectsBody query={projectsQuery} />;
}
