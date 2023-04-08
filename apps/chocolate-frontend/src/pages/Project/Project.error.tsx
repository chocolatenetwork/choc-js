interface ProjectErrorProps {
  type?: 'invalid';
}
export function ProjectError(props: ProjectErrorProps) {
  const { type } = props;
  if (type === 'invalid') return <div>Invalid project</div>;
  return <div>Error fetching project</div>;
}
