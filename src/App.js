import { Route, Switch } from "react-router-dom";
import { ScrollToTop } from "./components";
import {
  LoginPage,
  DashBoard,
  PasswordRecoveryPage,
  ChangePassword,
  RegisterPage,
} from "./pages";

import { ProtectedRoute } from "./components";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute path="/dashboard" component={DashBoard} />
        <Route path="/account-recovery" component={PasswordRecoveryPage} />
        <Route path="/change-password/:id" component={ChangePassword} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </>
  );
}
