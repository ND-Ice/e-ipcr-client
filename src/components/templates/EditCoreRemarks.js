import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";

import { getTemplates, addCoreFunctionRemarks } from "../../store/templates";
import { AppForm, FormControl } from "../forms";

const validationSchema = Yup.object().shape({
  remarks: Yup.string().min(10, "This should be atleast 10 characters long."),
});

export default function EditCoreRemarks({ open, id, successIndicator }) {
  const dispatch = useDispatch();
  const [allowEditing, setAllowEditing] = useState(false);
  const { funcId, succId } = useSelector(getTemplates);

  const handleSubmit = (values) => {
    dispatch(
      addCoreFunctionRemarks({ currentId: id, funcId, succId, ...values })
    );
    return open(false);
  };

  const handleDelete = () => {
    dispatch(
      addCoreFunctionRemarks({ currentId: id, funcId, succId, remarks: "" })
    );
    return open(false);
  };

  return (
    <Container>
      <Header>
        <h5 className="m-0 text-uppercase fw-bold">Remarks</h5>
        <Form>
          <Form.Check
            type="checkbox"
            label="Allow Editing"
            onChange={() => setAllowEditing(!allowEditing)}
          />
        </Form>
      </Header>

      <AppForm
        initialValues={{
          remarks: successIndicator?.remarks || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="multiline"
          name="remarks"
          title="Remarks"
          style={{ minHeight: "120px" }}
          loading={!allowEditing}
        />

        <div className="d-flex align-items-center justify-content-between mt-4">
          <FormControl
            variant="button"
            title="Save Changes"
            loading={!allowEditing}
          />
          <Button variant="danger" onClick={handleDelete}>
            Delete Function
          </Button>
        </div>
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
