import { Text } from '@mantine/core';
import { useHref, useLinkClickHandler } from 'react-router-dom';
import { MediumSemiBold } from './AddReviewContent/AddReviewContent.styles';

export function VerifyPrompt() {
  const url = `/verify`;
  const href = useHref(url);
  const handleClick = useLinkClickHandler<HTMLElement>(url);
  return (
    <div>
      <MediumSemiBold>
        To continue, your wallet need to be verified, please proceed to the{' '}
        <Text
          component="a"
          inherit
          color="blue"
          onClick={handleClick}
          href={href}
        >
          verify page
        </Text>{' '}
        to do so
      </MediumSemiBold>
    </div>
  );
}
