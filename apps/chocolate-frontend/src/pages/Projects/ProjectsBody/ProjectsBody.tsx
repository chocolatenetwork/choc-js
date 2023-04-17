import { IProjectDb } from '$chocolate-frontend/models/Project';
import { useElementSize } from '@mantine/hooks';
import { QueryObserverSuccessResult } from '@tanstack/react-query';
import { calcLen } from '../logic/calcLen';
import { ProjectCard } from '../Project/ProjectCard';
import { StyledDiv } from './ProjectsBody.styles';
interface ProjectsBodyProps {
  query: QueryObserverSuccessResult<IProjectDb[], unknown>;
}
export function ProjectsBody(props: ProjectsBodyProps) {
  const { query } = props;
  const { data } = query;
  const { width, ref } = useElementSize();

  return (
    <StyledDiv data-itemlen={calcLen(width)} ref={ref}>
      {data.map((each) => {
        return <ProjectCard project={each} key={each.id} />;
      })}
    </StyledDiv>
  );
}
