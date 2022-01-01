import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../store/user";

export default function ProtectedRoute({
  component: Component,
  render,
  ...otherProps
}) {
  const user = useSelector(getUser);
  return (
    <Route
      {...otherProps}
      render={(props) => {
        if (!user.currentUser) return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
}
