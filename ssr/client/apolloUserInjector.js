import React, { useEffect } from "react";
import { checkAuthQuery } from "../../src/api";
import { useQuery } from "react-apollo-hooks";
import { useAuth, useSetUser } from "../../src/lib/hooks";

export const UserInjector = ({ children }) => {
  const { loggedIn } = useAuth();
  const { setUser } = useSetUser();
  const {
    data: { checkAuth }
  } = useQuery(checkAuthQuery);

  const checkUser = async () => {
    try {
      if (checkAuth) {
        setUser({ user: checkAuth });
      }
    } catch (err) {
      console.log("Error injecting user: ", err);
    }
  };

  useEffect(() => {
    !loggedIn && checkUser();
  });

  return children;
};
