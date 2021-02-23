import styled from "styled-components";
import withTooltip from "../hocs/withTooltip";

const Title = styled.h2``;
Title.displayName = "Title";
export default withTooltip(Title, "WrappedTitle");
