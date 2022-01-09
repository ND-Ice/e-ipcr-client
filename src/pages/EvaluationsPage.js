import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { templatesReceived } from "../store/templates";
import { EvaluationCard } from "../components";

import templatesApi from "../api/templates";
import evaluationsApi from "../api/evaluations";

import {
  evaluationsReceived,
  evaluationsRequested,
  evaluationsRequestFailed,
  getEvaluations,
} from "../store/evaluations";

export default function EvaluationsPage({ history }) {
  const dispatch = useDispatch();
  const { list } = useSelector(getEvaluations);

  const ongoing = list?.filter((evaluation) =>
    moment(Date.now()).isSameOrBefore(evaluation?.due)
  );

  useEffect(() => {
    getEvaluationsList();
    getTemplates();
  }, []);

  const handleViewMore = (id) => history.push(`/dashboard/evaluations/${id}`);

  const getEvaluationsList = async () => {
    try {
      dispatch(evaluationsRequested());
      const evaluations = await evaluationsApi.getEvaluations();
      return dispatch(evaluationsReceived(evaluations.data));
    } catch (error) {
      return dispatch(evaluationsRequestFailed(error));
    }
  };

  const getTemplates = async () => {
    try {
      const templates = await templatesApi.getTemplates();
      dispatch(templatesReceived(templates.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContainer>
      <h5 className="mb-4">Evaluations</h5>
      <Container>
        {ongoing?.map((evaluation) => (
          <EvaluationCard
            key={evaluation?._id}
            evaluationInfo={evaluation}
            onPreview={handleViewMore}
          />
        ))}
      </Container>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem 5rem;
  }
`;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
`;
