import styled from 'styled-components';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 129px 73px;
  row-gap: 60px;

  background-color: var(--mantine-color-gray-1);
  border-radius: 10px;
  --placeholder-background: var(--mantine-color-gray-1);
  .mantine-Image-placeholder {
    border-radius: 0;
    background-color: var(--placeholder-background);
  }
`;
