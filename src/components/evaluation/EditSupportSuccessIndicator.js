import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SupportFunctions } from ".";
import {
  editSuccessIndicator,
  editSupportSuccessIndicator,
  getCreateEvaluation,
} from "../../store/createEvaluation";

import { AppForm, FormControl } from "../forms";

export default function EditSupportSuccessIndicator({ open }) {
  const dispatch = useDispatch();
  const { supportFunctions, targetIndicator } =
    useSelector(getCreateEvaluation);

  const supportFunction = supportFunctions?.filter(
    (coreFunc) => coreFunc?.id === targetIndicator?.funcId
  )[0];

  const successIndicator = supportFunction?.successIndicators?.filter(
    (successIndicator) => successIndicator?.id === targetIndicator?.indicatorId
  )[0];

  const handleSubmit = (values) => {
    dispatch(
      editSupportSuccessIndicator({
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
