import styled from "styled-components";

const Divider = styled.div`
  height: 2px;
  margin: 1rem 0;
  background: ${({ bg }) => bg};
  border-radius: 1rem;
  opacity: 0.2;
`;

export default Divider;
