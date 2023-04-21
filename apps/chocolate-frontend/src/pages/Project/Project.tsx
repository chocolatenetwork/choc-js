import { getProject } from '$chocolate-frontend/services/queries/project/getProject';
import { getReviewsByProject } from '$chocolate-frontend/services/queries/reviews/getReviewsByProject';
import { getUsers } from '$chocolate-frontend/services/queries/users/getUsers';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProjectError } from './Project.error';
import { ProjectLoading } from './Project.loading';
import { ProjectBody } from './ProjectBody/ProjectBody';

export function Project() {
  // query
  const params = useParams();
  const definedParam = params.id ?? '';
  const isParamDefined = definedParam !== '';
  const projectQuery = useQuery({
    queryKey: ['project', params.id],
    queryFn: () => getProject(definedParam),
    enabled: isParamDefined,
  });
  const reviewQuery = useQuery({
    queryKey: ['project', 'reviews', params.id],
    queryFn: () =>
      getReviewsByProject({
        id: definedParam,
        sort: 'createdAt',
        direction: 'DESC',
      }),
    enabled: isParamDefined,
  });
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  if (!isParamDefined) return <ProjectError type="invalid" />;
  if (projectQuery.isLoading) return <ProjectLoading />;
  if (projectQuery.isError) return <ProjectError />;
  // reviews too.
  // body
  return (
    <ProjectBody
      query={projectQuery}
      reviewsQuery={reviewQuery}
      users={usersQuery.data?.record || {}}
    />
  );
  //  get reviews later.
}
