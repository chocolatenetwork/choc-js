import { Stepper, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { useState } from 'react';
import styled from 'styled-components';
import FirstStep from './FirstStep/FirstStep';
import { VerifyData } from './FirstStep/types';
import SecondStep from './SecondStep';
import StepperContentLayout from './StepperContentLayout';
import { ActiveMap, VerifyLayoutProps } from './types';
import { makeVerifyData } from './Verify.utils';

const MAX = 2;
const MIN = 0;

function VerifyLayout(props: VerifyLayoutProps) {
  const [active, setActive] = useState(MIN);
  const [validMap, setValidMap] = useSetState<ActiveMap>({});
  const [formdata, setFormData] = useSetState<VerifyData>(makeVerifyData());
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
            description="Enter profile details"
            className="StepWrapper"
          >
            <StepperContentLayout
              hasNext={hasNext(active)}
              hasPrev={hasPrev(active)}
              nextStep={nextStep}
              prevStep={prevStep}
            >
              <FirstStep
                sync={setFormData}
                defaultValues={formdata}
                onValidChange={setValidMap}
                index={0}
              />
            </StepperContentLayout>
          </Stepper.Step>
          <Stepper.Step label="Second Step" description="Tweet verification id">
            <StepperContentLayout
              hasNext={hasNext(active)}
              hasPrev={hasPrev(active)}
              nextStep={nextStep}
              prevStep={prevStep}
            >
              <SecondStep
                verificationId={String(formdata.userVerification?.id)}
                index={1}
                onValidChange={setValidMap}
              />
            </StepperContentLayout>
          </Stepper.Step>
          <Stepper.Completed>
            <Text ta="center">
              We’ll review your profile, and it should be active shortly.
              Thanks!
            </Text>
          </Stepper.Completed>
        </Stepper>
      </div>
    </div>
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
    width: 90%;

    border-radius: 10px;

    .mantine-Stepper-content {
      padding: 30px;
      flex-grow: 1;
    }

    .mantine-Stepper-steps {
      padding: 20px;
      border-bottom: 1px solid var(--mantine-color-gray-5);
    }
    .mantine-Stepper-root {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;
