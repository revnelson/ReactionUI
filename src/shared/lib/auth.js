import { ApolloClient as client } from "apollo-client";
import Cookies from "js-cookie";
import { appConfig } from "../config";
import { mutations } from "../store/Auth";

export const checkAuth = () => {
  const userId = Cookies.getJSON(appConfig.siteName) || "";
  userId && setUser({ user: { userId } });
};

export const loginUser = async (username, password) => {
  // TODO - validate input
  const data = await client.mutate({
    mutation: mutations.loginUserMutation,
    variables: { username, password }
  });
  const { token, user } = data;
  Cookies.set(appConfig.siteName, token);
  setUser(user);
};

export const logoutUser = () => {
  Cookies.remove(appConfig.siteName);
  setUser({});
};

export const setUser = user => {
  client.mutate({
    mutation: mutations.setUserMutation,
    variables: { user }
  });
};
