import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  deleteCoreRating,
  editCoreRating,
  getTemplates,
} from "../../../store/templates";
import { AppForm, FormControl } from "../../forms";

const quality = [
  { id: "q1", value: 5, label: "Outstanding" },
  { id: "q2", value: 4, label: "Very Satisfactory" },
  { id: "q3", value: 3, label: "Satisfactory" },
  { id: "q4", value: 2, label: "Unsatisfactory" },
  { id: "q5", value: 1, label: "Poor" },
];
const timeliness = [
  { id: "t1", value: 5, label: "Outstanding" },
  { id: "t2", value: 4, label: "Very Satisfactory" },
  { id: "t3", value: 3, label: "Satisfactory" },
  { id: "t4", value: 2, label: "Unsatisfactory" },
  { id: "t5", value: 1, label: "Poor" },
];
const efficiency = [
  { id: "e1", value: 5, label: "Outstanding" },
  { id: "e2", value: 4, label: "Very Satisfactory" },
  { id: "e3", value: 3, label: "Satisfactory" },
  { id: "e4", value: 2, label: "Unsatisfactory" },
  { id: "e5", value: 1, label: "Poor" },
];

export default function EditCoreRating({ id, coreFunctions, open }) {
  const { funcId, succId } = useSelector(getTemplates);
  const dispatch = useDispatch();

  const coreFunction = coreFunctions?.filter((cf) => cf.id === funcId)[0];
  const successIndicator = coreFunction?.successIndicators?.filter(
    (succ) => succ.id === succId
  )[0];

  const { rating } = successIndicator?.actualAccomplishments;

  const handleSubmit = (values) => {
    dispatch(editCoreRating({ currentId: id, funcId, succId, ...values }));
    return open(false);
  };

  const handleDeleteRating = () => {
    dispatch(deleteCoreRating({ currentId: id, funcId, succId }));
    return open(false);
  };

  return (
    <Container>
      <Header>
        <h5 className="m-0 text-uppercase fw-bold">Edit Rating</h5>
      </Header>

      <div className="mb-4">
        <h6 className="m-0">{successIndicator?.title}</h6>
        <p>{successIndicator?.description}</p>
      </div>
      <div className="mb-4">
        <h6 className="m-0">
          {successIndicator?.actualAccomplishments?.title}
        </h6>
        <p>{successIndicator?.actualAccomplishments?.description}</p>
      </div>

      <AppForm
        initialValues={{
          quality: rating?.quality || "",
          timeliness: rating?.timeliness || "",
          efficiency: rating?.efficiency || "",
        }}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          <FormControl
            variant="radio"
            title="Quality"
            name="quality"
            menuItems={quality}
          />
          <FormControl
            variant="radio"
            title="Timeliness"
            name="timeliness"
            menuItems={timeliness}
          />
          <FormControl
            variant="radio"
            title="Efficiency"
            name="efficiency"
            menuItems={efficiency}
          />
        </GridContainer>
        <div className="mt-2 d-flex align-items-center justify-content-between">
          <FormControl variant="button" title="Rate" />
          <Button variant="danger" onClick={handleDeleteRating}>
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;
