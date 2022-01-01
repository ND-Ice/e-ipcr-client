import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NavLInkItem(props) {
  const { to, children, active, ...otherProps } = props;

  return (
    <LinkItem to={to} active={active} {...otherProps}>
      {children}
    </LinkItem>
  );
}

const LinkItem = styled(Link)`
  text-decoration: none;
  color: ${({ active, theme }) =>
    active ? theme.colors.accent.blue : theme.colors.black};
`;
