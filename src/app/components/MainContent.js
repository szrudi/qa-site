import styled from "styled-components";

export const MainContent = styled.main`
  border-top: solid 2px #ddd;
  @media (min-width: 1000px) {
    & {
      padding: 0 15px;
      border-left: solid 2px #ddd;
      border-top: none;
    }
  }
`;
