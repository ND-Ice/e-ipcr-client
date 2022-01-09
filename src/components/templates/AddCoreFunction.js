import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";

import { getTemplates, addCoreFunction } from "../../store/templates";
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

export default function AddCoreFunction({ open, id }) {
  const dispatch = useDispatch();
  const { list } = useSelector(getTemplates);

  const { coreFunctionsMeasure } = list?.filter(
    (template) => template._id === id
  )[0];

  const handleSubmit = (values) => {
    dispatch(addCoreFunction({ currentId: id, ...values }));
    return open(false);
  };

  return (
    <Container>
      <Header>
        <h5 className="m-0">Add Core Function</h5>
      </Header>

      <AppForm
        initialValues={{
          title: "",
          description: "",
          percentage: coreFunctionsMeasure || 0,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl variant="input" name="title" title="Function Title" />
        <FormControl variant="input" name="percentage" title="Percentage" />

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
