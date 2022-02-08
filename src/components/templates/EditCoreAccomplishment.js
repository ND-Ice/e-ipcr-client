import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";

import {
  getTemplates,
  addCoreAccomplishment,
  deleteCoreAccomplishment,
} from "../../store/templates";
import { AppForm, FormControl } from "../forms";

const validationSchema = Yup.object().shape({
  title: Yup.string().min(8, "This should be atleast 8 characters long."),
  description: Yup.string().min(
    10,
    "This should be atleast 10 characters long."
  ),
});

export default function EditCoreAccomplishment({ open, coreFunctions, id }) {
  const dispatch = useDispatch();
  const { funcId, succId } = useSelector(getTemplates);
  const [editable, setEditable] = useState(false);

  const coreFunction = coreFunctions?.filter((cf) => cf?.id === funcId)[0];
  const successIndicator = coreFunction?.successIndicators?.filter(
    (succ) => succ?.id === succId
  )[0];

  const handleSubmit = (values) => {
    dispatch(
      addCoreAccomplishment({ currentId: id, funcId, succId, ...values })
    );
    return open(false);
  };

  const handleDelete = () => {
    dispatch(
      deleteCoreAccomplishment({
        currentId: id,
        succId,
        funcId,
      })
    );
    return open(false);
  };

  return (
    <Container>
      <Header>
        <h5 className="m-0 text-uppercase fw-bold">Edit Accomplishment</h5>
        <Form>
          <Form.Check
            type="checkbox"
            label="Allow Editing"
            onChange={() => setEditable(!editable)}
          />
        </Form>
      </Header>

      <div>
        {successIndicator?.title}
        <p>{successIndicator?.description}</p>
      </div>

      <AppForm
        initialValues={{
          title: successIndicator?.actualAccomplishments?.title || "",
          description:
            successIndicator?.actualAccomplishments?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="input"
          name="title"
          title="Accomplishment"
          loading={!editable}
        />

        <FormControl
          variant="multiline"
          name="description"
          title="Description (Optional)"
          style={{ minHeight: "100px" }}
          loading={!editable}
        />

        <div className="d-flex align-items-center justify-content-between mt-4">
          <FormControl variant="button" title="Save Changes" />
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
