import { IProjectDb } from '$chocolate-frontend/models/Project';
import { Rating, Text } from '@mantine/core';
import { pluralize } from '../../../utils/pluralize';
import { LogoDiv, StyledDiv, TitleSection } from './Project.styles';

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
          <Text weight={'bold'}>{project.name}</Text>
          <Rating value={value || 0} readOnly />
          <Text>{pluralize(project.reviewCount, 'Review', 'Reviews')}</Text>
        </TitleSection>
        <Text>{project.description}</Text>
      </LogoDiv>
    </StyledDiv>
  );
}
