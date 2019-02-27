import React, { useEffect } from "react";
import { withApollo } from "react-apollo";
import { checkAuthQuery } from "../shared/api";
import { queries, withAuthStore } from "../shared/store/Auth";

const UserInjectorWithoutClient = ({ children, client, setUserMutation }) => {
  const checkUser = async () => {
    try {
      const { auth } = await client.readQuery({ query: queries.authQuery });
      if (!auth.id) {
        const {
          data: { checkAuth }
        } = await client.query({ query: checkAuthQuery });
        checkAuth && setUserMutation({ variables: { user: checkAuth } });
      }
    } catch (err) {
      console.log("Error injecting user: ", err);
    }
  };

  useEffect(() => {
    checkUser();
  });

  return children;
};

export const UserInjector = withApollo(
  withAuthStore(UserInjectorWithoutClient)
);
