import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  signups,
  newSignup,
  signUp,
  logout,
  authenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component
            {...props}
            user={user}
            signups={signups}
            newSignup={newSignup}
            signUp={signUp}
            logout={logout}
          />
        ) : (
          <Redirect to="/login" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
