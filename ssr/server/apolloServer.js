import React from "react";
import { useSetUser } from "../../src/lib/hooks";

export const ApolloUserInjector = ({ children, user }) => {
  const { setUser } = useSetUser();
  user && setUser({ user });
  return children;
};
