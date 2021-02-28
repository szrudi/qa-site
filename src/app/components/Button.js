import styled from "styled-components";

const Button = styled.button.attrs((props) => ({
  type: props.type ?? "button",
}))`
  margin-right: 5px;

  &:disabled {
    opacity: 0.6;
  }
`;

export default Button;
