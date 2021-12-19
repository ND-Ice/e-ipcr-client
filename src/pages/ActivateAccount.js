import * as Yup from "yup";
import styled from "styled-components";

import { AppForm, FormControl } from "../components/forms";
import { Links } from "../components";
import userApi from "../api/user";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This must be a valid email address")
    .required("This Field is required."),
});

export default function ActivateAccount() {
  const handleSubmit = async (values) => {
    try {
      const response = await userApi.activateAccount(values);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
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
          <h1 className="mb-2">This is Activate Account Page</h1>
          <p className="mb-4">
            This only work if you already have a account created by the admin
            and is not activated yet.
          </p>

          <FormControl
            variant="input"
            title="Email Address"
            name="email"
            className="p-2"
          />
          <FormControl
            variant="button"
            title="Activate"
            className="p-2 w-100"
          />
          <LinkContainer>
            <Links title="Back to Login" to="/" />
          </LinkContainer>
        </AppForm>
      </FormContainer>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  display: grid;
  min-height: 100vh;
  place-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 1.5rem;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const LinkContainer = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
`;
