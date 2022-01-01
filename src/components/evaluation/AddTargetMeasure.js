import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AppForm, FormControl } from "../forms";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  setSuccessIndicator,
  getCreateEvaluation,
  removeCurrentId,
} from "../../store/createEvaluation";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  targetMeasure: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
  actualAccomplishment: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
});

export default function AddTargetMeasure({ open }) {
  const dispatch = useDispatch();
  const evaluation = useSelector(getCreateEvaluation);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      setSuccessIndicator({
        currentId: evaluation.currentId,
        id: uuidv4(),
        targetMeasure: values.targetMeasure,
        actualAccomplishment: values.actualAccomplishment,
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
        initialValues={{ targetMeasure: "", actualAccomplishment: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="multiline"
          title="Target Measure (Success Indicator)"
          name="targetMeasure"
          style={{ minHeight: "120px" }}
        />
        <FormControl
          variant="multiline"
          title="Actual Accomplishment"
          name="actualAccomplishment"
          className="mb-4"
          style={{ minHeight: "120px" }}
        />
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <FormControl variant="button" title="Add Data" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
