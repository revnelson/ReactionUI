import React from "react";
import { withAuthStore } from "../../src/store/Auth";

const UserInjector = ({ children, setUserMutation, user }) => {
  user && setUserMutation({ variables: { user } });
  return children;
};

export const ApolloUserInjector = withAuthStore(UserInjector);
