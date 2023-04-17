import { IReviewDb } from '$chocolate-frontend/models/Review';
import { IUserDb } from '$chocolate-frontend/models/User';
import { calcLen } from '$chocolate-frontend/pages/Projects/logic/calcLen';
import { useElementSize } from '@mantine/hooks';
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
  const { width, ref } = useElementSize();

  return (
    <StyledDiv ref={ref} data-items={calcLen(width, 48, 10)}>
      {data.map((item) => {
        const currentUser = users[item.userId];
        return <ReviewCard review={item} key={item.id} user={currentUser} />;
      })}
    </StyledDiv>
  );
}
