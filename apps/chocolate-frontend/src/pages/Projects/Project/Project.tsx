import { IProjectDb } from '$chocolate-frontend/models/Project';
import { getAverage } from '$chocolate-frontend/utils/getAverage';
import { useHref, useLinkClickHandler } from 'react-router-dom';
import { Rating } from '../../../components/Rating';
import { formatRating } from '../../../utils/formatRating';
import { pluralize } from '../../../utils/pluralize';
import { H2, LogoDiv, StyledDiv, T0, TitleSection } from './Project.styles';

interface ProjectCardProps {
  project: IProjectDb;
}
export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;
  const normalValue = getAverage(project.ratingSum, project.reviewCount);

  const rating = formatRating(normalValue);
  const url = `/project/${project.projectId}`;
  const href = useHref(url);
  const handleClick = useLinkClickHandler<HTMLElement>(url);
  return (
    <StyledDiv>
      <LogoDiv logo={project.logo}>
        <TitleSection>
          <H2 component="a" onClick={handleClick} href={href}>
            {project.name} | {rating}
          </H2>
          {normalValue > 0 && <Rating value={normalValue} readOnly />}
          <H2>{pluralize(project.reviewCount, 'Review', 'Reviews')}</H2>
        </TitleSection>
        <T0>{project.description}</T0>
      </LogoDiv>
    </StyledDiv>
  );
}
