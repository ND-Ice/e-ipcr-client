import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  getCreateEvaluation,
  setSupportFunctions,
} from "../../store/createEvaluation";
import { AppForm, FormControl } from "../forms";
import { Alert } from "react-bootstrap";

export default function AddSupportSuccessIndicator({ open }) {
  const evaluations = useSelector(getCreateEvaluation);
  const dispatch = useDispatch();
  const { supportFunctionsMeasure } = evaluations;

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (values, { resetForm }) => {
    if (supportFunctionsMeasure === 0) {
      setSuccessMessage(null);
      return setErrorMessage("The percentage allocation already reached 0.");
    }
    if (values.percentage > supportFunctionsMeasure) {
      setSuccessMessage(null);
      return setErrorMessage(
        `Percentage should not exceed - ${supportFunctionsMeasure}`
      );
    }
    setErrorMessage(null);
    dispatch(
      setSupportFunctions({
        id: uuidv4(),
        ...values,
        successIndicators: [],
        rawAverage: [],
        rating: {},
      })
    );
    setSuccessMessage("Added Successfuly.");
    resetForm();
    return open(false);
  };

  return (
    <Container>
      <AppForm
        initialValues={{
          title: "",
          description: "",
          percentage: supportFunctionsMeasure,
        }}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          <FormControl variant="input" name="title" title="Title" />
          <FormControl variant="input" name="percentage" title="Percentage" />
        </GridContainer>

        <FormControl
          variant="multiline"
          name="description"
          title="Description (optional)"
          className="mb-2"
        />
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <FormControl variant="button" title="Insert" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div``;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;
