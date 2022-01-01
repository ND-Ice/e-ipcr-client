import React from "react";
import styled from "styled-components";

export default function BasicInfoItem({ title, item }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Item>{item}</Item>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.p`
  margin: 0;
  color: #4b5563;
`;

const Item = styled.p`
  font-size: 1.2rem;
`;
