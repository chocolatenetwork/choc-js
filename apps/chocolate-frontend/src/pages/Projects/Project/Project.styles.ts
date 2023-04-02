import { Image } from '@mantine/core';
import styled from 'styled-components';

export const StyledDiv = styled.div`
  background-color: var(--mantine-color-red-2);
  width: 100%;
  border-radius: var(--mantine-radius-md);
`;
interface ILogoDiv {
  logo: string;
}
export const LogoDiv = styled.div<ILogoDiv>`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 92px 48px;
  row-gap: 80px;
  position: relative;
  overflow: hidden;
  background-image: url(${({ logo }) => logo});
  background-size: 95% 95%;
  background-repeat: no-repeat;
  background-position: center;
  justify-content: space-between;
`;

export const ProjectImage = styled(Image)`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;