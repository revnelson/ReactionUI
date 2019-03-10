import { useQuery, useMutation, useApolloClient } from "react-apollo-hooks";
import { authQuery } from "../../store/Auth/queries";
import { setUserMutation } from "../../store/Auth/mutations";
import { logoutUserMutation } from "../../api";

export const useAuth = () => {
  const {
    data: { auth }
  } = useQuery(authQuery);

  const loggedIn = auth.id ? true : false;

  return { auth, loggedIn };
};

export const useSetUser = () => {
  const setUserHook = useMutation(setUserMutation);

  const setUser = user => {
    setUserHook({ variables: user });
  };

  return { setUser };
};

export const useLogoutUser = () => {
  const logoutUserHook = useMutation(logoutUserMutation);
  const client = useApolloClient();

  const logoutUser = () => {
    logoutUserHook();
    client.resetStore();
    // TODO - Fix user sticking around after logout
    // process.env.BROWSER &&
    //   window.localStorage.removeItem(process.env.SITE_NAME);
  };

  return { logoutUser };
};
