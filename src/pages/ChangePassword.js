import * as Yup from "yup";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AppForm, FormControl } from "../components/forms";
import { Links } from "../components";
import {
  getUser,
  currentUserReceived,
  userRequested,
  userRequestFailed,
} from "../store/user";
import userApi from "../api/user";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "This should be 5 characters long.")
    .required("This field is required."),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function ChangePassword({ match, history }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userId = match.params.id;

  const handleSubmit = async (values) => {
    try {
      dispatch(userRequested());
      const response = await userApi.changePassword(userId, values.password);
      dispatch(currentUserReceived(response.data));
      return history.push("/dashboard");
    } catch (error) {
      return userRequestFailed(error);
    }
  };
  return (
    <AppContainer>
      <FormContainer>
        <AppForm
          initialValues={{ password: "", repeatPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2">Change password</h1>
          <p className="mb-4">
            Please fill up the following field to change password.
          </p>

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
          <FormControl
            variant="button"
            title="Change Password"
            className="p-2 w-100"
            loading={user.loading}
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
