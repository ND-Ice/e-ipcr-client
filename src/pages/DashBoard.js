import { NavBar } from "../components";
import { Switch, useLocation, Link } from "react-router-dom";
import { ProtectedRoute } from "../components";
import styled from "styled-components";

import {
  CreateEvaluationResponse,
  EvaluationDetails,
  EvaluationsPage,
  Me,
  PastEvaluations,
} from ".";

const navItems = [
  { id: 1, title: "EVALUATIONS", to: "/dashboard" },
  { id: 2, title: "PAST EVALUATION", to: "/dashboard/past-evaluations" },
  { id: 3, title: "MY PROFILE", to: "/dashboard/me" },
];

export default function DashBoard() {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <Container>
        <ul class="nav nav-tabs">
          {navItems?.map((navItem) => (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location?.pathname === navItem?.to && "active"
                }`}
                to={navItem?.to}
              >
                {navItem?.title}
              </Link>
            </li>
          ))}
        </ul>
        <Switch>
          <ProtectedRoute
            path="/dashboard/past-evaluations"
            component={PastEvaluations}
          />
          <ProtectedRoute
            path="/dashboard/evaluations/:id"
            component={EvaluationDetails}
          />
          <ProtectedRoute path="/dashboard/me" component={Me} />
          <ProtectedRoute path="/" component={EvaluationsPage} />
        </Switch>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem 5rem;
  }
`;
