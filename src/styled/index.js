import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  width: 800px;
  justify-content: space-between;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 780px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
      order: 2;
    }
    section {
      order: 1;
    }
  }
`;
