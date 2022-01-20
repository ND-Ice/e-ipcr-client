import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar } from "react-icons/fi";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";

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
import { unSubmit } from "../store/templates";
import FeedBacks from "../components/FeedBacks";

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
      await responseApi.unsubmitResponse(yourResponse._id);
      setLoading(false);
      dispatch(
        unSubmit({
          responseId: yourResponse?.templateId,
          coreFunctions: yourResponse?.coreFunctions,
          supportFunctions: yourResponse?.supportFunctions,
          coreFunctionsMeasure: parseInt(yourResponse?.coreFunctionsMeasure),
          supportFunctionsMeasure: parseInt(
            yourResponse?.supportFunctionsMeasure
          ),
        })
      );
      return history.push(`/dashboard/create-response/${evaluation._id}`);
    } catch (error) {
      setLoading(false);
      return console.log(error);
    }
  };

  return (
    <>
      <AppContainer>
        <div>
          <Title>
            Individual Performance Commitment Review (IPCR){" "}
            <strong>
              {evaluation?.targetYear - 1}-{evaluation?.targetYear}
            </strong>
          </Title>

          {/* due date */}
          <DueDate>
            <FiCalendar className="icon" />{" "}
            {moment(evaluation?.due).format("LL")}
          </DueDate>

          {yourResponse && (
            <Alert className="mt-4" variant="success">
              We received your response.
            </Alert>
          )}
          {yourResponse && !yourResponse.isApproved && (
            <Alert variant="warning">
              Your evaluation is now in the queue to evaluate
            </Alert>
          )}
          {yourResponse?.isApproved && (
            <Alert variant="dark">
              Your response is already evaluated by the evaluator, resubmission
              and unsibmission is no longer available.
            </Alert>
          )}
          {yourResponse && (
            <Button onClick={() => setShowYourResponse(true)}>
              View Response
            </Button>
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
        </div>
        {yourResponse?.isApproved &&
          yourResponse?.feedback?.title?.length !== 0 &&
          yourResponse?.feedback?.comments?.list?.length !== 0 && (
            <FeedBacks feedbacks={yourResponse?.feedback} />
          )}
      </AppContainer>

      {/* modals */}
      <Modal
        show={showYourResponse}
        fullscreen
        onHide={() => setShowYourResponse(false)}
      >
        <ViewResponse response={yourResponse} open={setShowYourResponse} />
      </Modal>

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
    </>
  );
}

const AppContainer = styled.div`
  padding: 1rem;
  display: grid;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 2rem 5rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
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
