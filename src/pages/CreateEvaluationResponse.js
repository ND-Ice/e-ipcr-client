import React, { useState } from "react";
import styled from "styled-components";
import { Alert, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FiCheckCircle } from "react-icons/fi";

import responseApi from "../api/response";

import { CoreFunctions, SupportFunctions } from "../components/evaluation";
import {
  getCreateEvaluation,
  resetEvaluationForm,
} from "../store/createEvaluation";
import { getEvaluations } from "../store/evaluations";
import { getUser } from "../store/user";
import { useDispatch } from "react-redux";
import Logo from "../image/logo.png";

export default function CreateEvaluationResponse({ match, history }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

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
      setLoading(true);
      await responseApi.submitResponse(
        id,
        currentUser,
        coreFunctions,
        supportFunctions,
        coreTargetMeasures,
        supportTargetMeasures
      );
      setErrorMessage(null);
      dispatch(resetEvaluationForm());
      setLoading(false);
      return history.push(`/dashboard/evaluations/${id}`);
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };

  return (
    <AppContainer>
      <Header>
        <LogoImage src={Logo} />
        <div className="text-center">
          <i>Republic of the Philippines</i>
          <h4 className="m-0">
            EULOGIO “AMANG” RODRIGUEZ INSTITUTE OF SCIENCE AND TECHNOLOGY
          </h4>
          <i>Nagtahan, Sampaloc, Manila</i>
        </div>
      </Header>
      <CoreFunctions />
      <SupportFunctions />
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
            <div>
              <FiCheckCircle className="check-icon" />
              <span>
                I{" "}
                <strong>{`${currentUser?.name?.firstName} ${currentUser?.name?.lastName}`}</strong>{" "}
                commit to deliver and agree to be rated on the attainment of the
                following targets in accordance with the indicated measures for
                the period January to December {preview?.targetYear}
              </span>
            </div>

            {errorMessage && (
              <Alert variant="danger" className="mt-4">
                {errorMessage?.response?.data ||
                  errorMessage ||
                  "Something went wrong. Please try again later."}
              </Alert>
            )}
          </Wrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" disabled={loading} onClick={handleSubmit}>
            {loading ? "Submitting..." : "Submit"}
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

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
  left: -4rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;
