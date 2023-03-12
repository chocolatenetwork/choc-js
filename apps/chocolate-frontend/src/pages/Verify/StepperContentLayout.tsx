import { Button } from '@mantine/core';
import styled from 'styled-components';

interface VerifyFirstStepProps {
  hasNext?: boolean;
  hasPrev?: boolean;
  nextStep: VoidFunction;
  prevStep: VoidFunction;
  className?: string;
}
function StepperContentLayout(
  props: React.PropsWithChildren<VerifyFirstStepProps>
) {
  const { nextStep, prevStep, hasNext, hasPrev, children, ...rest } = props;

  return (
    <div {...rest}>
      <div className="StepsBody">{children}</div>
      <div className="StepsControl">
        {hasPrev && (
          <Button variant="default" onClick={prevStep} className="PrevStep">
            Back
          </Button>
        )}
        {hasNext && (
          <Button onClick={nextStep} className="NextStep">
            Next step
          </Button>
        )}
      </div>
    </div>
  );
}

export default styled(StepperContentLayout)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .StepsBody {
    flex-grow: 1;
  }

  .StepsControl {
    display: grid;
    grid-template-columns: repeat(1, min-content);
    grid-column-gap: 10px;
    justify-content: space-between;

    .NextStep {
      grid-column: 2;
    }
  }
`;
