import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./hooks";

export const ProtectedRoute = ({
  component: Component,
  publicOnly = false,
  ...rest
}) => {
  const { loggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        const {
          location: { pathname }
        } = props;
        return loggedIn !== publicOnly ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: loggedIn
                ? "/profile"
                : pathname === "/logout"
                ? "/"
                : `/login${pathname}`
            }}
          />
        );
      }}
    />
  );
};

// TODO - Add feedback for user to explain over/under authorization restrictions

// const LoginRequired = () => (
//   <div css={tw`flex flex-wrap items-center justify-center`}>
//     <div>
//       You must be logged in to view this page. Go here to login or here to
//       register.
//     </div>
//   </div>
// );
