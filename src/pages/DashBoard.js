import { NavBar } from "../components";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../components";

import {
  CreateEvaluationResponse,
  EvaluationDetails,
  EvaluationsPage,
  Me,
  PastEvaluations,
} from ".";

export default function DashBoard() {
  return (
    <>
      <NavBar />
      <Switch>
        <ProtectedRoute
          path="/dashboard/past-evaluations"
          component={PastEvaluations}
        />
        <ProtectedRoute
          path="/dashboard/evaluations/:id"
          component={EvaluationDetails}
        />
        <ProtectedRoute
          path="/dashboard/create-response/:id"
          component={CreateEvaluationResponse}
        />
        <ProtectedRoute path="/dashboard/me" component={Me} />
        <ProtectedRoute path="/" component={EvaluationsPage} />
      </Switch>
    </>
  );
}
