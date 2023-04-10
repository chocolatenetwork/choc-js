import { ReactComponent as UserCircle } from '$chocolate-frontend/assets/svg/user-circle.svg';
import { Rating } from '$chocolate-frontend/components/Rating';
import { IReviewDb } from '$chocolate-frontend/models/Review';
import { IUserDb } from '$chocolate-frontend/models/User';
import { formatRating } from '$chocolate-frontend/utils/formatRating';
import { Image } from '@mantine/core';
import { StyledDiv } from './ReviewCard.styles';

interface ReviewCardProps {
  review: IReviewDb;
  user: IUserDb | undefined;
}
const USER_PROFILE_IMAGE_SIZE = 64;
export function ReviewCard(props: ReviewCardProps) {
  const { review, user } = props;

  return (
    <StyledDiv>
      <Image
        src={user?.picture || null}
        withPlaceholder
        width={USER_PROFILE_IMAGE_SIZE}
        height={USER_PROFILE_IMAGE_SIZE}
        radius={USER_PROFILE_IMAGE_SIZE / 2}
        placeholder={
          <UserCircle
            width={USER_PROFILE_IMAGE_SIZE}
            height={USER_PROFILE_IMAGE_SIZE}
          />
        }
      />
      <Rating
        value={review.rating}
        label={formatRating(review.rating)}
        readOnly
      />
    </StyledDiv>
  );
}
