import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import {
  getCreateEvaluation,
  removeCurrentId,
  setSupportSuccessIndicator,
} from "../../store/createEvaluation";
import { AppForm, FormControl } from "../forms";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  targetMeasure: Yup.string()
    .min(5, "This should be atleast 5 characters long.")
    .required("This field is required."),
  actualAccomplishment: Yup.string()
    .min(5, "This should be atleast 5 characters long.")
    .required("This field is required."),
});

export default function AddSupportTargetMeasure({ open }) {
  const dispatch = useDispatch();
  const evaluation = useSelector(getCreateEvaluation);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      setSupportSuccessIndicator({
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
          title="Success Indicator (Target Measure)"
          name="targetMeasure"
          style={{ minHeight: "120px" }}
        />
        <FormControl
          variant="multiline"
          title="Actual Accomplishment"
          name="actualAccomplishment"
          className="mb-2"
          style={{ minHeight: "120px" }}
        />
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <FormControl variant="button" title="Insert" className="mt-2" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div``;
