import { Image, Text } from '@mantine/core';
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
export const H2 = styled(Text)`
  font-size: 26px;
  font-weight: 700;
  line-height: ${35 / 26};
  color: var(--mantine-color-dark-6);
` as typeof Text;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  & ${H2}[href]:hover {
    opacity: 0.5;
  }
`;


export const T0 = styled(Text)`
  font-size: 11.58px;
  font-weight: 400;
  line-height: ${17 / 11.58};
  color: var(--mantine-color-dark-6);
`;
