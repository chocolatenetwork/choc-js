import { IReviewDb } from '$chocolate-frontend/models/Review';
import { QueryObserverSuccessResult } from '@tanstack/react-query';

interface ReviewsBodyProps {
  query: QueryObserverSuccessResult<IReviewDb[], unknown>;
}
export function ReviewsBody(props: ReviewsBodyProps) {
  const { query } = props;
  const { data } = query;


  return <div></div>;
}
