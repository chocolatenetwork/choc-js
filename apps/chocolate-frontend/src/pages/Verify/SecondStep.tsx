import styled from 'styled-components';

interface SecondStepProps {
  className?: string;
}
function SecondStep(props: SecondStepProps) {
  return <div {...props}>Hi</div>;
}

export default styled(SecondStep)``;
