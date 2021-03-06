import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";

import {
  editCoreFunction,
  deleteCoreFunction,
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

export default function EditCoreFunction({ open, coreFunctions, id }) {
  const [allowEditing, setAllowEditing] = useState(false);
  const { currentId } = useSelector(getTemplates);
  const dispatch = useDispatch();

  const coreFunction = coreFunctions?.filter((cf) => cf?.id === currentId)[0];

  const handleSubmit = (values) => {
    dispatch(editCoreFunction({ currentId: id, funcId: currentId, ...values }));
    return open(false);
  };

  const handleDelete = () => {
    dispatch(
      deleteCoreFunction({
        templateId: id,
        funcId: currentId,
        percentage: coreFunction?.percentage,
      })
    );
    return open(false);
  };
  return (
    <Container>
      <Header>
        <h5 className="m-0 text-uppercase fw-bold">Core Function</h5>
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
          title: coreFunction?.title || "",
          description: coreFunction?.description || "",
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
