import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { getEvaluations } from "../store/evaluations";
import { EvaluationCard } from "../components";

export default function PastEvaluations() {
  const { list } = useSelector(getEvaluations);

  const pastEvaluations = list?.filter((evaluation) =>
    moment(Date.now()).isAfter(evaluation?.due)
  );

  return (
    <AppContainer>
      <h5>Past Evaluations</h5>
      <AppContent>
        {pastEvaluations?.map((evaluation) => (
          <EvaluationCard evaluationInfo={evaluation} />
        ))}
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 5rem;
  }
`;

const AppContent = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
`;
