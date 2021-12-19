import React from "react";
import styled from "styled-components";

export default function CreateEvaluationResponse({ match }) {
  const id = match.params.id;
  return (
    <AppContainer>
      <h1>Create your Evaluation here {id}</h1>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 5rem;
  }
`;
