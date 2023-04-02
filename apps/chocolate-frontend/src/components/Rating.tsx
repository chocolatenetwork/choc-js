import { ReactComponent as ChocolateLogo } from '$chocolate-frontend/assets/svg/chocolate-logo.svg';
import { Rating as MantineRating, RatingProps } from '@mantine/core';

export function Rating(props: RatingProps) {
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
    <MantineRating
      {...props}
      emptySymbol={getEmptyIcon}
      fullSymbol={getFullIcon}
    />
  );
}
