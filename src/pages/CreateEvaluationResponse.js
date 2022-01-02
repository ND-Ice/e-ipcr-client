import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FiCheckCircle } from "react-icons/fi";

import responseApi from "../api/response";

import { CoreFunctions, SupportFunctions } from "../components/evaluation";
import { getCreateEvaluation } from "../store/createEvaluation";
import { getEvaluations } from "../store/evaluations";
import { getUser } from "../store/user";

export default function CreateEvaluationResponse({ match, history }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [show, setShow] = useState(false);

  const id = match.params.id;
  const { currentUser } = useSelector(getUser);
  const { preview } = useSelector(getEvaluations);
  const {
    coreFunctions,
    supportFunctions,
    coreTargetMeasures,
    supportTargetMeasures,
  } = useSelector(getCreateEvaluation);

  const handleSubmit = async () => {
    if (coreFunctions?.length <= 1)
      return setErrorMessage(
        "Your Core Functions should be atleast 2 as well as the Success Indicators and Actual Accomplishments."
      );

    if (supportFunctions?.length <= 1)
      return setErrorMessage(
        "Your Support Functions should be atleast 2 as well as the Success Indicators and Actual Accomplishments."
      );

    try {
      await responseApi.submitResponse(
        id,
        currentUser,
        coreFunctions,
        supportFunctions,
        coreTargetMeasures,
        supportTargetMeasures
      );
      setErrorMessage(null);
      setSuccessMessage("Response submitted.");
      return history.push(`/dashboard/evaluations/${id}`);
    } catch (error) {
      setSuccessMessage(null);
      return setErrorMessage(error);
    }
  };

  return (
    <AppContainer>
      <CoreFunctions />
      <SupportFunctions />
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && (
        <Alert variant="danger">
          {errorMessage?.response?.data ||
            errorMessage ||
            "Something went wrong. Please try again later."}
        </Alert>
      )}
      <Button className="mt-2" onClick={() => setShow(true)}>
        Submit
      </Button>

      {/* submit confirmation */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            <FiCheckCircle className="check-icon" />
            <span>
              I{" "}
              <strong>{`${currentUser?.name?.firstName} ${currentUser?.name?.lastName}`}</strong>{" "}
              commit to deliver and agree to be rated on the attainment of the
              following targets in accordance with the indicated measures for
              the period January to December {preview?.targetYear}
            </span>
          </Wrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;
`;

const Wrapper = styled.div`
  padding: 0.5rem;

  .check-icon {
    width: 30px;
    height: 30px;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;
