import { Text } from '@mantine/core';
import { useHref, useLinkClickHandler } from 'react-router-dom';
import { MediumSemiBold } from './AddReviewContent/AddReviewContent.styles';

const CHOCOLATE_GITHUB = 'https://github.com/chocolatenetwork/choc-js';
export function UnknownErrorPrompt() {
  const url = `/verify`;
  const href = useHref(url);
  const handleClick = useLinkClickHandler<HTMLElement>(url);
  return (
    <div>
      <MediumSemiBold>
        We were unable to determine your authentication status
        <br />
        If you are not verified, please proceed to the
        <Text
          component="a"
          inherit
          color="blue"
          onClick={handleClick}
          href={href}
        >
          verify page
        </Text>
        to do so <br />
        Otherwise, please let us know what went wrong on our{' '}
        <Text component="a" color={'blue'} href={toIssueUrl(CHOCOLATE_GITHUB)}>
          github page
        </Text>{' '}
        , we hope to resolve this soon!
      </MediumSemiBold>
    </div>
  );
}
function toIssueUrl(gh: string) {
  return `${gh}/issues/new`;
}
