import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Alert } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import { getTemplates } from "../../store/templates";
import { getEvaluations } from "../../store/evaluations";
import { getUser } from "../../store/user";
import responseApi from "../../api/response";

export default function Confirmation({ files, id }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { list } = useSelector(getTemplates);
  const { preview } = useSelector(getEvaluations);
  const { currentUser } = useSelector(getUser);

  const {
    coreFunctions,
    supportFunctions,
    coreFunctionsMeasure,
    supportFunctionsMeasure,
  } = list?.filter((template) => template._id === id)[0];

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await responseApi.submitResponse(
        preview?._id,
        currentUser?._id,
        coreFunctions,
        supportFunctions,
        coreFunctionsMeasure,
        supportFunctionsMeasure,
        files
      );
      setLoading(false);
      return history.goBack();
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };
  return (
    <Container>
      <div className="mb-4">
        <h5 className="m-0">Confirmation</h5>
      </div>
      <FiCheckCircle className="icon" />
      <span>
        I{" "}
        <strong>
          {currentUser?.name?.firstName} {currentUser?.name?.lastName}{" "}
        </strong>{" "}
        commit to deliver and agree to be rated on the attainment of the
        following targets in accordance with the indicated measures for the
        period <strong> January to December {preview?.targetYear}.</strong>
      </span>
      {errorMessage && (
        <Alert variant="danger" className="mt-4">
          {errorMessage?.response?.data ||
            "Something went wrong. Please try again later."}
        </Alert>
      )}

      <div className="mt-4">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;

  .icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;
