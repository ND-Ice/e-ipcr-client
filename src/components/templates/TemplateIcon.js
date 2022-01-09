import React from "react";
import styled from "styled-components";

export default function TemplateIcon({
  icon: Icon,
  fg,
  bg,
  onClick,
  ...otherProps
}) {
  return (
    <Container fg={fg} bg={bg} onClick={onClick} {...otherProps}>
      <Icon className="icon" />
    </Container>
  );
}

const Container = styled.div`
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 3px;

  color: ${({ fg }) => fg};
  background: ${({ bg }) => bg};
`;
