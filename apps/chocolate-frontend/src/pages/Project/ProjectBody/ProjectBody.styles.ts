import { Text } from '@mantine/core';
import styled from 'styled-components';
export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 46px;
`;
export const HeaderBanner = styled.div`
  height: 533px;
  display: grid;
  grid-template-rows: 341px 192px;
`;
export const Banner = styled.div`
  background-color: var(--mantine-color-red-3);
  height: 100%;
`;

export const ProfileRow = styled.div`
  align-items: center;
  padding-right: 48px;
  padding-left: 97px;

  display: grid;
  grid-template-columns: min-content min-content;
  justify-content: space-between;
`;

export const RatingCircle = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid var(--mantine-color-gray-4);
  border-radius: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NameSection = styled.div`
  display: grid;
  grid-template-columns: 200px minmax(max-content, 300px);
  justify-content: space-between;
  column-gap: 46px;
  grid-auto-rows: 192px;
`;

export const PROFILE_IMAGE_SIZE = 200;
export const ImageWrapper = styled.div`
  .mantine-Image-root {
    position: relative;
    /* Not dynamic. 50% image height */
    bottom: ${PROFILE_IMAGE_SIZE / 2}px;
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: center;
  row-gap: 10px;

  flex-direction: column;
`;

export const H1 = styled(Text)`
  font-size: 34px;
  font-weight: 700;
  line-height: ${44.2 / 34};
  color: var(--mantine-color-dark-6);
` as typeof Text;
