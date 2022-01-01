import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar } from "react-icons/fi";
import { Alert, Button } from "react-bootstrap";
import { CustomModal } from "../components";

import {
  evaluationsRequested,
  evaluationsRequestFailed,
  evaluationPreviewed,
  getEvaluations,
} from "../store/evaluations";
import { getUser } from "../store/user";

import evaluationsApi from "../api/evaluations";
import responseApi from "../api/response";
import ViewResponse from "../components/evaluation/ViewResponse";
import { editFunctions, getCreateEvaluation } from "../store/createEvaluation";

export default function EvaluationDetails({ match, history }) {
  const id = match.params.id;
  const dispatch = useDispatch();
  const evaluations = useSelector(getEvaluations);
  const user = useSelector(getUser);
  const evaluation = evaluations.preview;
  const [evaluationResponse, setEvaluatonResponse] = useState(null);
  const [showYourResponse, setShowYourResponse] = useState(false);

  const yourResponse = evaluationResponse?.filter(
    (response) => response?.userId === user?.currentUser?._id
  )[0];

  useEffect(() => {
    fetchEvaluations();
    fetchEvaluationResponse();
  }, []);

  const fetchEvaluations = async () => {
    try {
      dispatch(evaluationsRequested());
      const evaluation = await evaluationsApi.getEvaluationsDetails(id);
      return dispatch(evaluationPreviewed(evaluation.data));
    } catch (error) {
      return dispatch(evaluationsRequestFailed(error));
    }
  };

  const fetchEvaluationResponse = async () => {
    try {
      const response = await responseApi.getEvaluationResponse(id);
      return setEvaluatonResponse(response.data);
    } catch (error) {
      return console.log(error);
    }
  };

  const handleUnSubmit = async () => {
    try {
      dispatch(
        editFunctions({
          coreFunctions: yourResponse?.coreFunctions,
          supportFunctions: yourResponse?.supportFunctions,
        })
      );
      await responseApi.unsubmitResponse(yourResponse._id);
      return history.push(`/dashboard/create-response/${evaluation._id}`);
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <AppContainer>
      {/* title */}
      <Title>
        Individual Performance Commitment Review (IPCR){" "}
        <strong>
          {evaluation?.targetYear}-{evaluation?.targetYear - 1}
        </strong>
      </Title>

      {/* due date */}
      <DueDate>
        <FiCalendar className="icon" /> {moment(evaluation?.due).format("LL")}
      </DueDate>

      {yourResponse && (
        <Alert className="mt-4" variant="success">
          We received your response.
        </Alert>
      )}
      {yourResponse && (
        <Button onClick={() => setShowYourResponse(true)}>View Response</Button>
      )}

      {!yourResponse && (
        <Button
          className="mt-4"
          onClick={() => history.push(`/dashboard/create-response/${id}`)}
        >
          Create
        </Button>
      )}

      {yourResponse && (
        <Button className="ms-2" onClick={handleUnSubmit}>
          Unsubmit
        </Button>
      )}
      <CustomModal
        heading={`Individual Performance Commitment Review (IPCR) ${
          evaluation?.targetYear
        }-${evaluation?.targetYear - 1}`}
        show={showYourResponse}
        fullscreen={true}
        onHide={() => setShowYourResponse(false)}
      >
        <ViewResponse response={yourResponse} />
      </CustomModal>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 2rem 10rem;
  }
`;

const Title = styled.h4`
  max-width: 40ch;
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 0.5rem;
  }
`;
