import { authQuery } from "./queries";

export const setUserId = (_, { user }, { cache }) => {
  const currentAuth = cache.readQuery({ query: authQuery }).auth;

  const data = {
    auth: {
      userId: user.userId || currentAuth.userId,
      email: user.email || currentAuth.email,
      name: user.name || currentAuth.name,
      __typename: "auth"
    }
  };

  cache.writeData({ data });
  return null;
};
