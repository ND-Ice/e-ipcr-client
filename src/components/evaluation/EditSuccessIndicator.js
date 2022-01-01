import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  editSuccessIndicator,
  getCreateEvaluation,
} from "../../store/createEvaluation";

import { AppForm, FormControl } from "../forms";

export default function EditSuccessIndicator({ open }) {
  const dispatch = useDispatch();
  const { coreFunctions, targetIndicator } = useSelector(getCreateEvaluation);

  const coreFunction = coreFunctions?.filter(
    (coreFunc) => coreFunc?.id === targetIndicator?.funcId
  )[0];

  const successIndicator = coreFunction?.successIndicators?.filter(
    (successIndicator) => successIndicator?.id === targetIndicator?.indicatorId
  )[0];

  const handleSubmit = (values) => {
    dispatch(
      editSuccessIndicator({
        funcId: targetIndicator?.funcId,
        indicatorId: targetIndicator?.indicatorId,
        successIndicatorTitle: values?.successIndicator,
        accomplishment: values?.actualAccomplishment,
      })
    );
    return open(false);
  };
  return (
    <Container>
      <AppForm
        initialValues={{
          successIndicator: successIndicator?.title || "",
          actualAccomplishment:
            successIndicator?.actualAccomplishments?.title || "",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="multiline"
          name="successIndicator"
          title="Success Indicators (Target Measure)"
          style={{ minHeight: "100px" }}
        />
        <FormControl
          variant="multiline"
          name="actualAccomplishment"
          title="Actual Accomplishment"
          style={{ minHeight: "100px" }}
        />
        <FormControl className="mt-2" variant="button" title="Save" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
`;
