import cookies from "cookie";
import jwt from "jsonwebtoken";
import { queries, mutations } from "../store/Auth";
import { checkAuthQuery } from "../api";
import { appConfig } from "../config";

export const checkAuth = (client, data) => {
  if (data === "clear") return clearUser(client);
  const userId = client.readQuery({ query: queries.authQuery }).auth.id;
  !userId &&
    client.query({ query: checkAuthQuery }).then(({ data }) => {
      const user = data.checkAuth;
      user && setUser(client, user);
    });
};

export const loginUser = async (client, username, password) => {
  // TODO - validate input
  const data = await client.mutate({
    mutation: mutations.loginUserMutation,
    variables: { username, password }
  });
  const { token, user } = data;
  setUser(user);
};

export const logoutUser = () => {
  setUser({});
};

export const setUser = (client, user) => {
  client.mutate({
    mutation: mutations.setUserMutation,
    variables: { user }
  });
};

export const clearUser = client => {
  client.mutate({ mutations: clearUserMutation });
};

export const checkCookie = cookie => {
  const token = cookies.parse(cookie || "")[appConfig.siteName] || "";
  if (token) return token;
  return null;
};
