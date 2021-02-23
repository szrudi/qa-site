import styled from "styled-components";

const Details = styled.details`
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0.2rem 0.2rem 0;
  margin-bottom: 0.6rem;
  list-style: none;

  &:hover {
    border-color: #818181;
  }

  & > summary::-webkit-details-marker {
    display: none;
  }

  & > summary {
    cursor: pointer;
    font-weight: bold;
    margin: -0.2rem -0.2rem 0;
    padding: 0.2rem;
  }

  & > p {
    padding: 1rem;
    margin: 0;
  }

  &[open] {
    padding: 0.2rem;
  }

  &[open] > summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.2rem;
  }
`;

Details.displayName = "Details";
export default Details;
