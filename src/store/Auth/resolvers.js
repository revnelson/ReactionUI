import { authQuery } from "./queries";
import { defaults } from "./defaults";

export const setUser = (_, { user }, { cache }) => {
  const data = {
    auth: {
      id: user.id,
      username: user.username || "",
      createdAt: user.createdAt || "",
      updatedAt: user.updatedAt || "",
      name: { ...user.name, __typename: "name" } || defaults.auth.name,
      __typename: "auth"
    }
  };

  cache.writeData({ data });
  return null;
};

export const clearUser = (_, none, { cache }) => {
  const data = {
    auth: {
      id: "",
      username: "",
      createdAt: "",
      updatedAt: "",
      name: defaults.auth.name,
      __typename: "auth"
    }
  };

  cache.writeData({ data });
  return null;
};
