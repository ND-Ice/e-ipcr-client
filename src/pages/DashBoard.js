import { NavBar } from "../components";
import { Route, Switch } from "react-router-dom";

import {
  CreateEvaluationResponse,
  EvaluationDetails,
  EvaluationsPage,
  Me,
  OngoingEvaluations,
  PastEvaluations,
} from ".";

export default function DashBoard() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/dashboard/past-evaluations" component={PastEvaluations} />
        <Route
          path="/dashboard/ongoing-evaluations"
          component={OngoingEvaluations}
        />
        <Route
          path="/dashboard/evaluations/:id"
          component={EvaluationDetails}
        />
        <Route
          path="/dashboard/create-response/:id"
          component={CreateEvaluationResponse}
        />
        <Route path="/dashboard/me" component={Me} />
        <Route path="/" component={EvaluationsPage} />
      </Switch>
    </>
  );
}
