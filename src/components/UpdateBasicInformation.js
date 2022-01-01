import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

import { AppForm, FormControl } from "./forms";
import {
  currentUserReceived,
  getUser,
  userRequestFailed,
  userRequested,
} from "../store/user";
import userApi from "../api/user";

const genderOptions = [
  { id: 1, title: "Male", value: "Male" },
  { id: 2, title: "Female", value: "Female" },
];

export default function UpdateBasicInformation({ user, open }) {
  const dispatch = useDispatch();
  const userProps = useSelector(getUser);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { firstName, middleName, lastName } = user?.name;

  const handleSubmit = async (values) => {
    try {
      dispatch(userRequested());
      const faculty = await userApi.updateUserBasicInfo(user._id, values);
      setSuccessMessage("Updated Successfully.");
      dispatch(currentUserReceived(faculty.data));
      return open(false);
    } catch (error) {
      setErrorMessage(error);
      return dispatch(userRequestFailed(error));
    }
  };
  return (
    <Container>
      <AppForm
        initialValues={{
          firstName: firstName || "",
          middleName: middleName || "",
          lastName: lastName || "",
          gender: user.gender || "",
          qualification: user?.qualification || "",
        }}
        onSubmit={handleSubmit}
      >
        <NameContainer>
          <FormControl
            variant="input"
            name="firstName"
            title="First Name"
            className="p-2"
            loading={true}
          />
          <FormControl
            variant="input"
            name="middleName"
            title="Middle Name"
            className="p-2"
            loading={true}
          />
          <FormControl
            variant="input"
            name="lastName"
            title="Last Name"
            className="p-2"
            loading={true}
          />
        </NameContainer>
        <FormControl
          variant="select"
          name="gender"
          title="Gender"
          className="p-2"
          menuItems={genderOptions}
          loading={userProps.loading}
        />

        <FormControl
          variant="input"
          name="qualification"
          title="Highest Qualification"
          className="p-2 mb-2"
          loading={userProps.loading}
        />
        {errorMessage && (
          <Alert variant="danger">
            {errorMessage?.response?.data ||
              "Something went wrong. Please try again later."}
          </Alert>
        )}

        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <FormControl
          variant="button"
          title="Save"
          className="mt-2"
          loading={userProps.loading}
        />
      </AppForm>
    </Container>
  );
}

const Container = styled.div``;
const NameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
