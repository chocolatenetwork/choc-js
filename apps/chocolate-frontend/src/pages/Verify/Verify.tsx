import { Button, Group, Stepper } from '@mantine/core';
import { useState } from 'react';
import styled from 'styled-components';

interface VerifyLayoutProps {
  className?: string;
}

interface IStep {
  label: string;
  description: string;
  content: React.ReactNode;
}
const steps: IStep[] = [
  { label: 'First Step', description: 'Sign a random message', content: '' },
  { label: 'Second Step', description: 'Tweet the message', content: '' },
];
const completed = {
  // Todo: Extract component
  content: 'We’ll review your submission and get back to you',
};
function VerifyLayout(props: VerifyLayoutProps) {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div {...props}>
      <div className="SectionBg">
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          {steps.map((value) => {
            return (
              <Stepper.Step label={value.label} description={value.description}>
                {value.content}
              </Stepper.Step>
            );
          })}
          <Stepper.Completed>{completed.content}</Stepper.Completed>
        </Stepper>

        <Group position="apart" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </div>
    </div>
  );
}

function VerifyFirstStep() {
  // Todo: Impl first step.
  return <></>;
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
  }
`;
