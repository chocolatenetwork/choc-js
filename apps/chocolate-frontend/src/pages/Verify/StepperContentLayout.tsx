import { Button } from '@mantine/core';

export enum FontWeights {
  bold = 500,
}
interface VerifyFirstStepProps {
  hasNext?: boolean;
  hasPrev?: boolean;
  nextStep: VoidFunction;
  prevStep: VoidFunction;
}
export function StepperContentLayout(
  props: React.PropsWithChildren<VerifyFirstStepProps>
) {
  const { nextStep, prevStep, hasNext, hasPrev, children } = props;

  return (
    <>
      <div className="StepsBody">{children}</div>
      <div className="StepsControl">
        {hasPrev && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {hasNext && <Button onClick={nextStep}>Next step</Button>}
      </div>
    </>
  );
}
