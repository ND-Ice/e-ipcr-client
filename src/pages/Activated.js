import React from "react";
import styled from "styled-components";
import { FiCheckCircle } from "react-icons/fi";

export default function Activated({ history }) {
  return (
    <Container>
      <Wrapper>
        <IconContainer>
          <FiCheckCircle className="icon-check" />
        </IconContainer>
        <h2>Account Activated</h2>

        <Button onClick={() => history.push("/")}>Proceed to Login</Button>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
`;

const IconContainer = styled.div`
  margin-bottom: 1rem;
  .icon-check {
    width: 100px;
    height: 100px;
    color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;

const Button = styled.button`
  border: 0;
  outline: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.accent.emerald};
`;
