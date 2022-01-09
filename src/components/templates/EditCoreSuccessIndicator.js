import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";

import {
  deleteCoreSuccessIndicator,
  editCoreSuccessIndicator,
  getTemplates,
} from "../../store/templates";
import { AppForm, FormControl } from "../forms";

const validationSchema = Yup.object().shape({
  title: Yup.string().min(8, "This should be atleast 8 characters long."),
  description: Yup.string().min(
    10,
    "This should be atleast 10 characters long."
  ),
});

export default function EditCoreSuccessIndicator({ open, coreFunctions, id }) {
  const [allowEditing, setAllowEditing] = useState(false);
  const { funcId, succId } = useSelector(getTemplates);
  const dispatch = useDispatch();

  const cf = coreFunctions?.filter((cf) => cf?.id === funcId)[0];

  const successIndicator = cf?.successIndicators?.filter(
    (succ) => succ?.id === succId
  )[0];

  const handleSubmit = (values) => {
    dispatch(
      editCoreSuccessIndicator({ currentId: id, funcId, succId, ...values })
    );
    return open(false);
  };

  const handleDelete = () => {
    dispatch(deleteCoreSuccessIndicator({ currentId: id, funcId, succId }));
    return open(false);
  };
  return (
    <Container>
      <Header>
        <h5 className="m-0">Sucess Indicator</h5>
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
          title: successIndicator?.title || "",
          description: successIndicator?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="input"
          name="title"
          title="Function Title"
          loading={!allowEditing}
        />

        <FormControl
          variant="multiline"
          name="description"
          title="Description (Optional)"
          style={{ minHeight: "100px" }}
          loading={!allowEditing}
        />

        <div className="d-flex align-items-center justify-content-between mt-4">
          <FormControl
            variant="button"
            title="Save Changes"
            loading={!allowEditing}
          />
          <Button variant="danger" onClick={handleDelete}>
            Delete
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
