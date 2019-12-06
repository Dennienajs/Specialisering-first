import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context";

// Hvilken route som skal renders, hvis der er en auththenticated user (Content component)
export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useContext(AuthContext);
  return (
    <Route
      data-testid="private-route"
      {...rest}
      render={routeProps =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};
