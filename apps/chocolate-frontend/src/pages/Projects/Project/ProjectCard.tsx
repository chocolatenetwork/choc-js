import image from '$chocolate-frontend/assets/svg/image.svg';
import { IProjectDb } from '$chocolate-frontend/models/Project';
import { getAverage } from '$chocolate-frontend/utils/getAverage';
import { toAverageValue } from '$chocolate-frontend/utils/toAverageValue';
import { useHref, useLinkClickHandler } from 'react-router-dom';
import { Rating } from '../../../components/Rating';
import { formatRating } from '../../../utils/formatRating';
import { pluralize } from '../../../utils/pluralize';
import { H2, LogoDiv, StyledDiv, T0, TitleSection } from './ProjectCard.styles';
interface ProjectCardProps {
  project: IProjectDb;
}
export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;
  const normalValue = getAverage(project.ratingSum, project.reviewCount);
  const ratingValue = toAverageValue(normalValue);
  const rating = formatRating(normalValue);
  const url = `/project/${project.id}`;
  const href = useHref(url);
  const handleClick = useLinkClickHandler<HTMLElement>(url);
  return (
    <StyledDiv>
      {/* Todo: Use actual image here. */}
      <LogoDiv logo={project.logo || image}>
        <TitleSection>
          <H2 component="a" onClick={handleClick} href={href}>
            {project.name} | {rating}
          </H2>
          {normalValue > 0 && <Rating value={ratingValue} readOnly />}
          <H2>{pluralize(project.reviewCount, 'Review', 'Reviews')}</H2>
        </TitleSection>
        <T0>{project.description}</T0>
      </LogoDiv>
    </StyledDiv>
  );
}
