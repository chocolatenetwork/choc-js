import { IProjectDb } from '$chocolate-frontend/models/Project';
import { QueryObserverSuccessResult } from '@tanstack/react-query';

interface ProjectsBodyProps {
  query: QueryObserverSuccessResult<IProjectDb[], unknown>;
}
export function ProjectsBody(props: ProjectsBodyProps) {
  const { query } = props;

  return <div></div>;
}
