import { IReviewDb } from '$chocolate-frontend/models/Review';
import { IUserDb } from '$chocolate-frontend/models/User';
import { UseQueryResult } from '@tanstack/react-query';
import { ReviewsBody } from '../ReviewsBody/ReviewsBody';
import { ReviewsError } from './Reviews.error';
import { ReviewsLoading } from './Reviews.loading';

interface ReviewsProps {
  query: UseQueryResult<IReviewDb[], unknown>;
  users: Record<string, IUserDb | undefined>;
}
export function Reviews(props: ReviewsProps) {
  const { query, users } = props;

  if (query.isLoading) return <ReviewsLoading />;
  if (query.isError) return <ReviewsError />;

  return <ReviewsBody query={query} users={users} />;
}
