import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import { FiAward, FiEdit, FiHome } from "react-icons/fi";
import * as Yup from "yup";

import { CustomModal, Divider, Icons, InformationItem } from ".";
import { AppForm, FormControl, SubmitButton } from "./forms";

const validationSchema = Yup.object().shape({
  houseNumber: Yup.string()
    .max(4, "This should not exceed 4 characters.")
    .required("This field is required."),
  street: Yup.string()
    .min(4, "This should be atleast 4 characters long.")
    .required("This field is required."),
  barangay: Yup.string()
    .min(4, "This should be atleast 4 characters long.")
    .required("This field is required."),
  city: Yup.string()
    .min(4, "This should be atleast 4 characters long.")
    .required("This field is required."),
  province: Yup.string()
    .min(4, "This should be atleast 4 characters long.")
    .required("This field is required."),
  degree: Yup.string()
    .min(15, "This field should be atleast 15 characters long.")
    .required("This field is required"),
});

export default function ProfileIntro() {
  const [isActive, setIsActive] = useState(false);
  const handleSubmit = (values) => console.log(values);
  return (
    <Container>
      <Card>
        {/* header */}
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            Introduction{" "}
            <Icons icon={FiEdit} size={40} onClick={() => setIsActive(true)} />
          </div>
        </Card.Header>
        <Card.Body>
          {/* Address */}
          <InformationItem icon={FiHome}>
            Lives in , San Juan Metro Manila Philippines.
          </InformationItem>

          {/* Degree Attainment */}
          <InformationItem icon={FiAward}>
            Doctor of Science in Computer Science
          </InformationItem>
        </Card.Body>
      </Card>
      <CustomModal
        show={isActive}
        heading="Update Introduction"
        onHide={() => setIsActive(false)}
      >
        <AppForm
          initialValues={{
            houseNumber: "",
            street: "",
            barangay: "",
            city: "",
            province: "",
            degree: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <p className="mb-2">Complete Address</p>
          <FormGrid>
            <FormControl
              variant="input"
              title="House Number"
              placeholder="House Number"
              name="houseNumber"
            />
            <FormControl
              variant="input"
              title="Street"
              placeholder="Street"
              name="street"
            />
            <FormControl
              variant="input"
              title="Barangay"
              placeholder="Barangay"
              name="barangay"
            />
            <FormControl
              variant="input"
              title="City or Municipality"
              placeholder="City or Municipality"
              name="city"
            />
            <FormControl
              variant="input"
              title="Province"
              placeholder="Province"
              name="province"
            />
          </FormGrid>
          <Divider bg="#232a34" />
          <FormControl
            variant="input"
            title="Highest Degree (Degree Acronym) Degree Description"
            placeholder="(Degree Acronym) Degree Description "
            name="degree"
          />
          <SubmitButton title="Save" />
        </AppForm>
      </CustomModal>
    </Container>
  );
}

const Container = styled.div`
  height: max-content;
`;

const FormGrid = styled.div`
  display: grid;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
  }
`;
