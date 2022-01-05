import { useState } from "react";
import { Alert } from "react-bootstrap";
import styled from "styled-components";
import * as Yup from "yup";

import userApi from "../api/user";
import { Links } from "../components";
import { AppForm, FormControl } from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This must be a valid email address")
    .required("This Field is required"),
});

export default function PasswordRecoveryPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await userApi.forgotPassword(values.email);
      setErrorMessage(null);
      setLoading(false);
      console.log(response.data);
      return setSuccessMessage(response.data);
    } catch (error) {
      setLoading(false);
      setSuccessMessage(null);
      return setErrorMessage(error);
    }
  };
  return (
    <AppContainer>
      <FormContainer>
        <AppForm
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2">Recover your Account with Ease.</h1>
          <p className="mb-4">
            Account recovery only works for those who already have an account
            that forgot their password.
          </p>

          <FormControl
            variant="input"
            title="Email Address"
            name="email"
            className="p-2 mb-2"
            loading={loading}
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
            title={loading ? "Recovering" : "Start Recovering"}
            className="w-100 p-2"
            loading={loading}
          />
          <LinkContainer>
            <Links to="/" title="Back to Login" />
          </LinkContainer>
        </AppForm>
      </FormContainer>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const FormContainer = styled.div`
  padding: 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const LinkContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 1rem;
`;
