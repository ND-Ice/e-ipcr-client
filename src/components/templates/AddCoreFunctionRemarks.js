import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addCoreFunctionRemarks, getTemplates } from "../../store/templates";

import { AppForm, FormControl } from "../forms";

export default function AddRemarks({ id, open }) {
  const dispatch = useDispatch();
  const { funcId, succId } = useSelector(getTemplates);

  const handleSubmit = (values) => {
    dispatch(
      addCoreFunctionRemarks({ currentId: id, funcId, succId, ...values })
    );
    return open(false);
  };

  return (
    <Container>
      <h5>Add Remarks</h5>
      <AppForm initialValues={{ remarks: "" }} onSubmit={handleSubmit}>
        <FormControl
          variant="multiline"
          name="remarks"
          title="Remarks"
          className="mb-3"
          style={{ minHeight: "100px" }}
        />
        <FormControl variant="button" title="Remarks" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;
`;
