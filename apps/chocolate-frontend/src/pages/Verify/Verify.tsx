import { useState } from 'react';
import styled from 'styled-components';

interface VerifyLayoutProps {
  className?: string;
}
function VerifyLayout(props: VerifyLayoutProps) {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div {...props}>
      <div className="SectionBg"></div>
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
  }
`;
