import React from "react";
import styled from "styled-components";

import { LinkIcon } from "../components";

export default function OngoingEvaluations({ history }) {
  return (
    <AppContainer>
      <HeaderContainer>
        <LinkIcon onClick={() => history.goBack()} />
        <h2 className="ms-2">Ongoing Evaluation</h2>
      </HeaderContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 5rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
