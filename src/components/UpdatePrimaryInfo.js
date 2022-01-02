import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { AppForm, FormControl } from "./forms";

import {
  currentUserReceived,
  getUser,
  userRequestFailed,
  userRequested,
} from "../store/user";
import { Alert } from "react-bootstrap";
import userApi from "../api/user";

export default function UpdatePrimaryInfo({ user, open }) {
  const dispatch = useDispatch();
  const userProps = useSelector(getUser);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (values) => {
    try {
      dispatch(userRequested());
      const faculty = await userApi.updateUserInfo(user?._id, values);
      dispatch(currentUserReceived(faculty.data));
      setErrorMessage(null);
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
          contact: user?.contact || "",
          houseNumber: user?.address?.houseNumber || "",
          street: user?.address?.street || "",
          barangay: user?.address?.barangay || "",
          city: user?.address?.city || "",
          province: user?.address?.province || "",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="input"
          name="contact"
          title="Contact Number"
          className="p-2"
          loading={userProps.loading}
        />
        <AddressContainer>
          <FormControl
            variant="input"
            name="houseNumber"
            title="House Number"
            className="p-2"
            loading={userProps.loading}
          />
          <FormControl
            variant="input"
            name="street"
            title="Street"
            className="p-2"
            loading={userProps.loading}
          />
          <FormControl
            variant="input"
            name="barangay"
            title="Barangay"
            className="p-2"
            loading={userProps.loading}
          />
          <FormControl
            variant="input"
            name="city"
            title="City"
            className="p-2"
            loading={userProps.loading}
          />
          <FormControl
            variant="input"
            name="province"
            title="Province"
            className="p-2 mb-2"
            loading={userProps.loading}
          />
        </AddressContainer>
        {errorMessage && (
          <Alert variant="danger">
            {errorMessage?.response?.data ||
              "Something went wrong. Please try again later."}
          </Alert>
        )}
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

const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
