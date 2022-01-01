import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { AppForm, FormControl } from "../forms";
import { v4 as uuidv4 } from "uuid";

import {
  getCreateEvaluation,
  setCoreFunctions,
} from "../../store/createEvaluation";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
  percentage: Yup.number().required("This field is required."),
});

export default function AddCoreFunctions({ open }) {
  const dispatch = useDispatch();
  const evaluations = useSelector(getCreateEvaluation);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { coreFunctionsMeasure } = evaluations;

  const handleSubmit = (values, { resetForm }) => {
    if (coreFunctionsMeasure === 0) {
      setSuccessMessage(null);
      return setErrorMessage("The percentage allocation already reached 0.");
    }
    if (values.percentage > coreFunctionsMeasure) {
      setSuccessMessage(null);
      return setErrorMessage(
        `Percentage should not exceed - ${coreFunctionsMeasure}`
      );
    }
    setErrorMessage(null);
    dispatch(
      setCoreFunctions({
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
          percentage: coreFunctionsMeasure,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          <FormControl variant="input" title="Title" name="title" />
          <FormControl variant="input" title="Percentage" name="percentage" />
        </GridContainer>
        <FormControl
          variant="multiline"
          title="Description (Optional)"
          name="description"
          className="mb-2"
        />
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <FormControl variant="button" title="Insert" className="mt-2" />
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
