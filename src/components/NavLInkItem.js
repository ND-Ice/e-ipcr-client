import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NavLInkItem(props) {
  const { to, children, ...otherProps } = props;

  return (
    <LinkItem to={to} {...otherProps}>
      {children}
    </LinkItem>
  );
}

const LinkItem = styled(Link)`
  text-decoration: none;
  color: black;
`;
