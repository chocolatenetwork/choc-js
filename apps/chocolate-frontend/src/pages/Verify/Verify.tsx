import { Button, Select, Stepper, Text } from '@mantine/core';
import { useState } from 'react';
import styled from 'styled-components';
import { AccountType } from '../../services/queries/putVerifyUser';

interface VerifyLayoutProps {
  className?: string;
}
interface ActiveMap {
  [pageId: number]: boolean;
}
const MAX = 2;
const MIN = 0;
function VerifyLayout(props: VerifyLayoutProps) {
  const [active, setActive] = useState(MIN);
  const [validMap, setValidMap] = useState<ActiveMap>({});

  const hasNext = (num: number) => num < MAX && validMap[active];
  const hasPrev = (num: number) => num > MIN;

  const nextStep = () => {
    return setActive((current) => (hasNext(current) ? current + 1 : current));
  };
  const prevStep = () => {
    return setActive((current) => (hasPrev(current) ? current - 1 : current));
  };

  return (
    <div {...props}>
      <div className="SectionBg">
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step
            label="First Step"
            description="Sign a random message"
            className="StepWrapper"
          >
            <VerifyFirstStep
              hasNext={hasNext(active)}
              hasPrev={hasPrev(active)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </Stepper.Step>
          <Stepper.Step label="Second Step" description="Tweet the message">
            ''
          </Stepper.Step>
          <Stepper.Completed>
            We’ll review your submission and get back to you
          </Stepper.Completed>
        </Stepper>
      </div>
    </div>
  );
}

enum FontWeights {
  bold = 500,
}
interface VerifyFirstStepProps {
  hasNext?: boolean;
  hasPrev?: boolean;
  nextStep: VoidFunction;
  prevStep: VoidFunction;
}
function VerifyFirstStep(props: React.PropsWithChildren<VerifyFirstStepProps>) {
  const { nextStep, prevStep, hasNext, hasPrev } = props;

  return (
    <>
      <div className="StepsBody">
        <FirstStep />
      </div>
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
export default styled(VerifyLayout)`
  width: 100%;
  height: 100%;

  padding: var(--mantine-spacing-md) 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .SectionBg {
    background-color: var(--mantine-color-gray-3);
    width: 82%;
    height: 82%;

    border-radius: 10px;
  }
  .StepsControl {
    display: flex;
    justify-content: space-between;
  }
  .mantine-Stepper-content {
    padding: 40px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .StepsBody {
    flex-grow: 1;
  }
  .TextContainer {
    padding: 4.5px 0;
    border: 1px solid var(--mantine-color-gray-4);
    background-color: var(--mantine-color-gray-0);
    border-radius: var(--mantine-radius-sm);
  }
  .mantine-Stepper-steps {
    padding: 30px 20px;
    border-bottom: 1px solid var(--mantine-color-gray-5);
  }
  .mantine-Stepper-root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

function FirstStep() {
  // Todo: Impl first step.
  const message =
    'bb282cd8089975d581648e730defd6a39fe4d23c089a082fa538968a3e5990be';
  const signature =
    '1b985bd00eaf2a58695450f313103d5ed10a22c46bb2e11a49a9e1fe50ca7dee';
  return (
    <>
      <div>
        <Select
          label="Account Type"
          placeholder="Select Account Type.."
          data={Object.values(AccountType)}
        />
      </div>
      <div>
        <div>
          <Text size={'sm'} fw={FontWeights.bold}>
            Message
          </Text>
          <Text className="TextContainer" ta="center" c="dimmed">
            {message}
          </Text>
        </div>
        <Button variant="default">Generate Message</Button>
      </div>
      <div>
        <Text size={'sm'} fw={FontWeights.bold}>
          Signature
        </Text>
        <Text className="TextContainer" ta="center" c="dimmed">
          {signature}
        </Text>
        <Button variant="default">Sign Message</Button>
      </div>
    </>
  );
}
  