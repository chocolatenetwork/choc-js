import { IReviewDb } from '$chocolate-frontend/models/Review';
import { UseQueryResult } from '@tanstack/react-query';
import { ReviewsBody } from '../ReviewsBody';
import { ReviewsError } from './Reviews.error';
import { ReviewsLoading } from './Reviews.loading';

interface ReviewsProps {
  query: UseQueryResult<IReviewDb[], unknown>;
}
export function Reviews(props: ReviewsProps) {
  const { query } = props;

  if (query.isLoading) return <ReviewsLoading />;
  if (query.isError) return <ReviewsError />;

  return <ReviewsBody query={query} />;
}
