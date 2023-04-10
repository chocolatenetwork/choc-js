import { IReviewDb } from '$chocolate-frontend/models/Review';
import { IUserDb } from '$chocolate-frontend/models/User';
import { QueryObserverSuccessResult } from '@tanstack/react-query';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { StyledDiv } from './ReviewsBody.styles';
interface ReviewsBodyProps {
  query: QueryObserverSuccessResult<IReviewDb[], unknown>;
  users: Record<string, IUserDb | undefined>;
}
export function ReviewsBody(props: ReviewsBodyProps) {
  const { query, users } = props;
  const { data } = query;

  return (
    <StyledDiv>
      {data.map((item) => {
        const currentUser = users[item.userId];
        return <ReviewCard review={item} key={item.id} user={currentUser} />;
      })}
    </StyledDiv>
  );
}
