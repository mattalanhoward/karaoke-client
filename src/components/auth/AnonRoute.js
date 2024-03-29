import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../../views/Home";
const AnonRoute = ({
  component: Component,
  authenticated,
  authenticate,
  logout,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated === false ? (
          ((<Home />),
          (
            <Component {...props} authenticate={authenticate} logout={logout} />
          ))
        ) : (
          <Redirect to="/search" />
        )
      }
      {...rest}
    />
  );
};

export default AnonRoute;
