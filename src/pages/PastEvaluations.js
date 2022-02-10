import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { getEvaluations } from "../store/evaluations";
import { EvaluationCard } from "../components";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: 1, title: "EVALUATIONS", to: "/dashboard" },
  { id: 2, title: "PAST EVALUATION", to: "/dashboard/past-evaluations" },
];

export default function PastEvaluations({ history }) {
  const { list } = useSelector(getEvaluations);
  const location = useLocation();

  const pastEvaluations = list?.filter((evaluation) =>
    moment(Date.now()).isAfter(evaluation?.due)
  );

  const handlePreview = (id) => history.push(`/dashboard/evaluations/${id}`);

  return (
    <AppContainer>
      <AppContent>
        {pastEvaluations?.map((evaluation) => (
          <EvaluationCard
            evaluationInfo={evaluation}
            onPreview={handlePreview}
          />
        ))}
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  margin-top: 1rem;
`;

const AppContent = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
`;
