import { Route, Switch } from "react-router-dom";
import { ScrollToTop } from "./components";
import {
  ActivateAccount,
  LoginPage,
  DashBoard,
  PasswordRecoveryPage,
  ChangePassword,
} from "./pages";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/activate-account" component={ActivateAccount} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/account-recovery" component={PasswordRecoveryPage} />
        <Route path="/change-password/:id" component={ChangePassword} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </>
  );
}
