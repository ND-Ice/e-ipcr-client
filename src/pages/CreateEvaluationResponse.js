import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import responseApi from "../api/response";

import { CoreFunctions, SupportFunctions } from "../components/evaluation";
import { getCreateEvaluation } from "../store/createEvaluation";
import { getUser } from "../store/user";

export default function CreateEvaluationResponse({ match, history }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const id = match.params.id;
  const { currentUser } = useSelector(getUser);
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
      <Button className="mt-2" onClick={handleSubmit}>
        Submit
      </Button>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;
`;
