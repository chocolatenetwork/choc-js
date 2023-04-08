import { IProjectDb } from '$chocolate-frontend/models/Project';
import { IReviewDb } from '$chocolate-frontend/models/Review';
import {
  QueryObserverSuccessResult,
  UseQueryResult,
} from '@tanstack/react-query';

interface ProjectBodyProps {
  query: QueryObserverSuccessResult<IProjectDb, unknown>;
  reviewQuery: UseQueryResult<IReviewDb[], unknown>;
}
export function ProjectBody(props: ProjectBodyProps) {
  return (
    <div>
      <div className="header"></div>
      <div className="tabs"></div>
      <div className="add-review"></div>
      <div className="reviews"></div>
    </div>
  );
}
