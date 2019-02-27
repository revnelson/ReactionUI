import React, { useEffect } from "react";
import { withApollo } from "react-apollo";
import { checkAuthQuery } from "../shared/api";
import { queries, withAuthStore } from "../shared/store/Auth";

const UserInjectorWithoutClient = ({ children, client, setUserMutation }) => {
  const checkUser = async () => {
    try {
      const setUser = await client.readQuery({ query: queries.authQuery })
        .authQuery;
      if (!setUser) {
        const { data } = await client.query({ query: checkAuthQuery });
        const { user } = data && data.checkAuth ? data.checkAuth : "";
        user && setUserMutation({ variables: { user } });
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
