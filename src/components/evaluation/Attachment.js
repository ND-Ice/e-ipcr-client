import React from "react";
import styled from "styled-components";

export default function Attachment({ info, onNavigate }) {
  return (
    <Container onClick={() => onNavigate(info?.path)}>
      <Title>{info?.filename}</Title>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  cursor: pointer;
  margin: 0.5rem 0;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: all 120ms;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Title = styled.h6`
  margin: 0;
`;
