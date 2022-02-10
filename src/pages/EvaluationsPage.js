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
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: 1, title: "EVALUATIONS", to: "/dashboard" },
  { id: 2, title: "PAST EVALUATION", to: "/dashboard/past-evaluations" },
];

export default function EvaluationsPage({ history }) {
  const dispatch = useDispatch();
  const { list } = useSelector(getEvaluations);
  const location = useLocation();

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

const AppContainer = styled.section``;

const Container = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
`;
