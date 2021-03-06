import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

import { AppForm, FormControl } from "../components/forms";
import { Links } from "../components";

import usersApi from "../api/user";
import {
  getUser,
  userRegistered,
  userRequestFailed,
  userRequested,
} from "../store/user";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This must be a valid email address.")
    .required("This Field is required."),
  firstName: Yup.string()
    .min(4, "This should be atleast 4 characters Long")
    .required("This field is required."),
  lastName: Yup.string()
    .min(4, "This should be atleast 4 characters Long")
    .required("This field is required."),
  college: Yup.string().required("This field is required."),
  birthDate: Yup.date()
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
    .required("This field is required."),
  position: Yup.string().required("This field is required"),
  password: Yup.string()
    .min(8, "This should be atleast 8 characters long")
    .required("This field is required."),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const facultyPosition = [
  { id: 1, value: "Regular Faculty" },
  { id: 2, value: "Dean" },
  { id: 3, value: "Chair Person" },
  { id: 3, value: "Non Teaching" },
];

const colleges = [
  { id: 1, value: "CAFA" },
  { id: 2, value: "CAS" },
  { id: 3, value: "CED" },
  { id: 4, value: "CEN" },
  { id: 5, value: "CHM" },
  { id: 6, value: "CIT" },
  { id: 7, value: "CPAC" },
];

export default function RegisterPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      dispatch(userRequested());
      const faculty = await usersApi.registerUser(values);
      setErrorMessage(null);
      setSuccessMessage(faculty.data);
      dispatch(userRegistered(faculty.data));
      return resetForm();
    } catch (error) {
      setErrorMessage(error);
      setSuccessMessage(null);
      return dispatch(userRequestFailed(error));
    }
  };

  return (
    <AppContainer>
      <FormContainer>
        <AppForm
          initialValues={{
            email: "",
            firstName: "",
            middleName: "",
            lastName: "",
            birthDate: "",
            password: "",
            college: "",
            position: "",
            repeatPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <h3 className="fw-bold">Register</h3>
          <p className="mb-4">kindly fill up the following field to proceed.</p>

          <FormControl
            variant="input"
            title="Email Address"
            name="email"
            className="p-2"
            loading={user.loading}
          />
          <GridContainer>
            <FormControl
              variant="input"
              title="First Name"
              name="firstName"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="input"
              title="Last Name"
              name="lastName"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="input"
              title="Middle Name (Optional)"
              name="middleName"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="date"
              title="Birth Date"
              name="birthDate"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="select"
              title="Position"
              name="position"
              className="p-2"
              menuItems={facultyPosition}
              loading={user.loading}
            />
            <FormControl
              variant="select"
              title="College"
              name="college"
              className="p-2"
              menuItems={colleges}
              loading={user.loading}
            />
            <FormControl
              variant="password"
              title="Password"
              name="password"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="password"
              title="Repeat Password"
              name="repeatPassword"
              className="p-2"
              loading={user.loading}
            />
          </GridContainer>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && (
            <Alert variant="danger">
              {errorMessage?.response?.data ||
                "Something went wrong. Please try again later."}
            </Alert>
          )}
          <div className="d-flex align-items-center justify-content-between">
            <FormControl
              variant="button"
              title={user.loading ? "Generating..." : "Register"}
              className="p-2"
              loading={user.loading}
            />
            <Links to="/" title="Back to Login" />
          </div>
        </AppForm>
      </FormContainer>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 600px;
  }
`;

const GridContainer = styled.div`
  display: grid;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;
