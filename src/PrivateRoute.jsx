import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context";

// Hvilken route som skal renders, hvis der er en auththenticated user (Content component)
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
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

// Fjern det ene "!" i "!!currentUser" for kun at kunne bruge appen hvis du er logget ind.

export default PrivateRoute;
