import React from "react";
import { withAuthStore } from "../shared/store/Auth";

const UserInjector = ({ children, setUserMutation, user }) => {
  user && setUserMutation({ variables: { user } });
  return children;
};

export const ApolloUserInjector = withAuthStore(UserInjector);
