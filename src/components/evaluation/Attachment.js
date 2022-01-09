import React from "react";
import styled from "styled-components";

export default function Attachment({ info, onNavigate }) {
  console.log(info);
  return (
    <Container onClick={() => onNavigate(info?.path)}>
      <Title>{info?.filename}</Title>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  cursor: pointer;
  margin: 1rem 0;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const Title = styled.h6`
  margin: 0;
`;
