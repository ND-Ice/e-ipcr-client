import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addCoreSuccessIndicator, getTemplates } from "../../store/templates";
import { AppForm, FormControl } from "../forms";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, "This should be atleast 8 characters long.")
    .required("This Field is required"),
  description: Yup.string().min(
    10,
    "This should be atleast 10 characters long."
  ),
});
export default function AddCoreSuccessIndicator({ id, open }) {
  const dispatch = useDispatch();
  const { currentId } = useSelector(getTemplates);

  const handleSubmit = (values) => {
    dispatch(
      addCoreSuccessIndicator({
        currentId: id,
        funcId: currentId,
        id: uuidv4(),
        ...values,
      })
    );
    return open(false);
  };

  return (
    <Container>
      <Header>
        <h5 className="m-0 text-uppercase fw-bold">Add Success Indicator</h5>
      </Header>
      <AppForm
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl variant="input" name="title" title="Success Indicator" />

        <FormControl
          variant="multiline"
          name="description"
          title="Description (Optional)"
          style={{ minHeight: "100px" }}
        />

        <div className="d-flex align-items-center justify-content-between mt-4">
          <FormControl variant="button" title="Save Changes" />
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
