import { IProjectDb } from '$chocolate-frontend/models/Project';
import { Rating } from '@mantine/core';
import { pluralize } from '../../../utils/pluralize';
import { H2, LogoDiv, StyledDiv, T0, TitleSection } from './Project.styles';

interface ProjectCardProps {
  project: IProjectDb;
}
export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;
  const value = project.ratingSum / project.reviewCount;

  return (
    <StyledDiv>
      <LogoDiv logo={project.logo}>
        <TitleSection>
          <H2>{project.name}</H2>
          <Rating value={value || 0} readOnly />
          <H2>{pluralize(project.reviewCount, 'Review', 'Reviews')}</H2>
        </TitleSection>
        <T0>{project.description}</T0>
      </LogoDiv>
    </StyledDiv>
  );
}
