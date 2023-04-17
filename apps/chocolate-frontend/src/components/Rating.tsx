import { ReactComponent as ChocolateLogo } from '$chocolate-frontend/assets/svg/chocolate-logo.svg';
import {
  MediumSemiBold,
  RatingWrap,
} from '$chocolate-frontend/pages/Project/AddReviewContent/AddReviewContent.styles';
import { T0 } from '$chocolate-frontend/pages/Projects/Project/ProjectCard.styles';
import { Rating as MantineRating, RatingProps } from '@mantine/core';

interface RatingExtra extends RatingProps {
  description?: string;
  label?: string;
}
export function Rating(props: RatingExtra) {
  const { description, label } = props;
  const getEmptyIcon = (currentValue: number) => {
    switch (currentValue) {
      default:
        return <ChocolateLogo width={32} height={32} opacity={0.5} />;
    }
  };

  const getFullIcon = (value: number) => {
    switch (value) {
      default:
        return <ChocolateLogo width={32} height={32} />;
    }
  };

  return (
    <div>
      <T0 pb={10} fw={'bold'}>
        {description}
      </T0>
      <RatingWrap>
        <MantineRating
          {...props}
          emptySymbol={getEmptyIcon}
          fullSymbol={getFullIcon}
        />
        <MediumSemiBold pl={10}>{label}</MediumSemiBold>
      </RatingWrap>
    </div>
  );
}
