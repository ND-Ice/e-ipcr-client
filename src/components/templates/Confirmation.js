import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Alert } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import SignaturePad from "react-signature-canvas";

import { getTemplates } from "../../store/templates";
import { getEvaluations } from "../../store/evaluations";
import { getUser } from "../../store/user";
import responseApi from "../../api/response";
import logsApi from "../../api/logs";

export default function Confirmation({ files, id }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { list } = useSelector(getTemplates);
  const { preview } = useSelector(getEvaluations);
  const { currentUser } = useSelector(getUser);
  let sigPadRef = useRef({});

  const {
    coreFunctions,
    supportFunctions,
    coreFunctionsMeasure,
    supportFunctionsMeasure,
  } = list?.filter((template) => template?._id === id)[0];

  const coreFuncRating = coreFunctions?.map((coreFunc) => {
    const ave = coreFunc?.rawAverage?.reduce(
      (acc, curr) => acc + curr?.average,
      0
    );
    return (
      (ave / coreFunc?.successIndicators?.length) * (coreFunc?.percentage / 100)
    );
  });

  // get the support functions rating
  const supportFuncRating = supportFunctions?.map((suppFunc) => {
    const ave = suppFunc?.rawAverage?.reduce(
      (acc, curr) => acc + curr?.average,
      0
    );
    return (
      (ave / suppFunc?.successIndicators?.length) * (suppFunc?.percentage / 100)
    );
  });

  const finalRating = [...supportFuncRating, ...coreFuncRating]
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await responseApi.submitResponse(
        preview?._id,
        currentUser?._id,
        id,
        coreFunctions,
        supportFunctions,
        coreFunctionsMeasure,
        supportFunctionsMeasure,
        files,
        finalRating,
        currentUser,
        sigPadRef.current.getTrimmedCanvas().toDataURL()
      );
      await logsApi.addEvaluationLogs(
        id,
        currentUser,
        "Submitted evaluation response."
      );
      setLoading(false);
      return history.goBack();
    } catch (error) {
      console.log(error);
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
      {/* signature pad  */}
      <h6 className="mt-3">Draw your Signature here:</h6>
      <SigPad>
        <SignaturePad
          penColor="black"
          ref={sigPadRef}
          canvasProps={{
            width: 450,
            height: 200,
            className: "sigCanvas",
            border: "2px solid black",
          }}
        />
      </SigPad>
      <Button
        variant="outline-danger"
        className="me-2"
        onClick={() => sigPadRef.current.clear()}
      >
        Clear
      </Button>
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

const SigPad = styled.div`
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.accent.blue};
`;
