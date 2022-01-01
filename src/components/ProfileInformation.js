import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Card } from "react-bootstrap";

import { CustomModal, Icons, InformationItem } from ".";
import { AppForm, FormControl, SubmitButton } from "./forms";
import {
  FiCalendar,
  FiEdit,
  FiHome,
  FiMail,
  FiPhoneCall,
  FiUser,
} from "react-icons/fi";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(5, "This should be atleast 5 characters long.")
    .required("This field is required"),
  lastName: Yup.string()
    .min(5, "This should be atleast 5 characters long.")
    .required("This field is required"),
  gender: Yup.string().required("This field is required."),
  birthDate: Yup.string().required("This field is required."),
  birthPlace: Yup.string().required("This field is required."),
});

const contactValidation = Yup.object().shape({
  contact: Yup.string()
    .matches(/^(09|\+639)\d{9}$/, "Invalid phone number.")
    .required("This field is required"),

  email: Yup.string()
    .email("This must be a valid email.")
    .required("This field is required"),
});

const menuItems = [
  { title: "Male", value: "Male" },
  { title: "Female", value: "Female" },
];

export default function ProfileInformation() {
  const [updateBasicActive, setUpdateBasicActive] = useState(false);
  const [updatePersonalActive, setUpdatePersonalActive] = useState(false);
  return (
    <Container>
      {/* information */}
      <CardContainer>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              User Information{" "}
              <Icons
                icon={FiEdit}
                size={40}
                onClick={() => setUpdateBasicActive(true)}
              />
            </div>
          </Card.Header>
          <Card.Body>
            <InformationItem icon={FiUser}>Joshua Dela Cruz</InformationItem>
            <InformationItem icon={FiCalendar}>July, 02, 2000</InformationItem>
            <InformationItem icon={FiHome}>
              Ligaya Gabaldon Nueva Ecija
            </InformationItem>
            <InformationItem icon={FiUser}>Male</InformationItem>
            <InformationItem icon={FiCalendar}>21 yrs. old</InformationItem>
          </Card.Body>
        </Card>
      </CardContainer>

      {/* Basic information Modal */}
      <CustomModal
        show={updateBasicActive}
        heading="Update Basic Information"
        onHide={() => setUpdateBasicActive(false)}
      >
        <AppForm
          initialValues={{
            firstName: "",
            lastName: "",
            gender: "",
            birthDate: "",
            birthPlace: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
        >
          <GridContainer>
            <FormControl
              variant="input"
              title="First Name"
              name="firstName"
              placeholder="First Name"
            />
            <FormControl
              variant="input"
              title="Last Name"
              name="lastName"
              placeholder="Last Name"
            />
          </GridContainer>

          <GridContainer>
            <FormControl
              variant="select"
              title="Gender"
              name="gender"
              placeholder="Gender"
              menuItems={menuItems}
            />

            <FormControl
              variant="date"
              title="Birth Date"
              name="birthDate"
              placeholder="Birth Date"
            />
          </GridContainer>

          <FormControl
            variant="input"
            title="Birth Place"
            name="birthPlace"
            placeholder="Birth Place"
          />
          <SubmitButton title="Save" />
        </AppForm>
      </CustomModal>

      {/* Contact information */}
      <CardContainer>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              Contact Information{" "}
              <Icons
                icon={FiEdit}
                size={40}
                onClick={() => setUpdatePersonalActive(true)}
              />
            </div>
          </Card.Header>
          <Card.Body>
            <InformationItem icon={FiPhoneCall}>0966248118</InformationItem>
            <InformationItem icon={FiMail}>
              delacruzjoshua691@gmail.com
            </InformationItem>
          </Card.Body>
        </Card>

        {/* update profile information */}
        <CustomModal
          show={updatePersonalActive}
          heading="Update Basic Information"
          onHide={() => setUpdatePersonalActive(false)}
        >
          <AppForm
            initialValues={{
              contact: "",
              email: "",
            }}
            validationSchema={contactValidation}
            onSubmit={(values) => console.log(values)}
          >
            <FormControl
              variant="input"
              title="Contact Number"
              name="contact"
              placeholder="Contact Number"
            />
            <FormControl
              variant="input"
              title="Email Address"
              name="email"
              placeholder="Email Address"
            />

            <SubmitButton title="Save" />
          </AppForm>
        </CustomModal>
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardContainer = styled.div`
  height: max-content;
`;

const GridContainer = styled.div`
  display: grid;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
  }
`;
