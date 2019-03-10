import React from "react";
import { useAuth } from "../../src/lib/hooks";

export const ApolloUserInjector = ({ children, user }) => {
  const { setUser } = useAuth();
  user && setUser({ user });
  return children;
};
