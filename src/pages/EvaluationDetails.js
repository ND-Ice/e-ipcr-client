import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar } from "react-icons/fi";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
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
import { editFunctions } from "../store/createEvaluation";

export default function EvaluationDetails({ match, history }) {
  const id = match.params.id;
  const dispatch = useDispatch();
  const evaluations = useSelector(getEvaluations);
  const user = useSelector(getUser);
  const evaluation = evaluations.preview;
  const [evaluationResponse, setEvaluatonResponse] = useState(null);
  const [showYourResponse, setShowYourResponse] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      dispatch(
        editFunctions({
          coreFunctions: yourResponse?.coreFunctions,
          supportFunctions: yourResponse?.supportFunctions,
        })
      );
      await responseApi.unsubmitResponse(yourResponse._id);
      setLoading(false);
      return history.push(`/dashboard/create-response/${evaluation._id}`);
    } catch (error) {
      setLoading(false);
      return console.log(error);
    }
  };

  return (
    <AppContainer>
      {/* title */}
      <Title>
        Individual Performance Commitment Review (IPCR){" "}
        <strong>
          {evaluation?.targetYear - 1}-{evaluation?.targetYear}
        </strong>
      </Title>

      {/* due date */}
      <DueDate>
        <FiCalendar className="icon" /> {moment(evaluation?.due).format("LL")}
      </DueDate>

      {yourResponse && (
        <Alert className="mt-4" variant="success">
          {yourResponse?.isApproved?.recommendation ||
            "We received your response."}
        </Alert>
      )}
      {yourResponse?.isApproved && (
        <Alert variant="dark">
          Your response is already rated and approved by the evaluator,
          resubmission and unsibmission is no longer available.
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
          Create Response
        </Button>
      )}

      {yourResponse && (
        <Button
          disabled={yourResponse?.isApproved}
          className="ms-2"
          onClick={handleUnSubmit}
        >
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

      <Modal centered show={loading}>
        <Loading>
          <Spinner
            animation="border"
            variant="secondary"
            className="me-2"
            size="md"
          />
          Unsubmitting...
        </Loading>
      </Modal>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 2rem 5rem;
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

const Loading = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
`;
