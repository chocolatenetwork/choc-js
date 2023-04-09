import { Text } from '@mantine/core';
import styled from 'styled-components';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 40px;
  padding-top: 24px;
`;

export const MediumSemiBold = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  line-height: ${24.8 / 16};
  color: var(--mantine-color-dark-6);
` as typeof Text;
export const RatingWrap = styled.div`
  display: flex;
  align-items: center;
`;
