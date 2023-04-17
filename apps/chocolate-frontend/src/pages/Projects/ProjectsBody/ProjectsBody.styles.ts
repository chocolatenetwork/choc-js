import styled from 'styled-components';

export const StyledDiv = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, 400px);
  justify-content: space-between;
  &[data-itemlen='1'] {
    justify-content: center;
  }
  padding: 72px;
  row-gap: 36px;
  column-gap: 80px;
`;
