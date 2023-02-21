import { Button, Select, Stepper, TextInput } from '@mantine/core';
import { useState } from 'react';
import styled from 'styled-components';
import { AccountType } from '../../services/queries/putVerifyUser';

interface VerifyLayoutProps {
  className?: string;
}

function VerifyLayout(props: VerifyLayoutProps) {
  const [active, setActive] = useState(0);
  const nextStep = () => {
    return setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () => {
    return setActive((current) => (current > 0 ? current - 1 : current));
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
            <VerifyFirstStep nextStep={nextStep} prevStep={prevStep} />
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

interface VerifyFirstStepProps {
  nextStep: VoidFunction;
  prevStep: VoidFunction;
}
function VerifyFirstStep(props: React.PropsWithChildren<VerifyFirstStepProps>) {
  const { nextStep, prevStep } = props;
  // Todo: Impl first step.
  return (
    <>
      <div className="StepsBody">
        <div>
          <Select
            placeholder="Select Account Type.."
            data={Object.values(AccountType)}
          />
        </div>
        <div>
          <TextInput />
          <Button>Generate Message</Button>
        </div>
        <div>
          <TextInput />
          <Button>Sign Message</Button>
        </div>
      </div>
      <div className="StepsControl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
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
