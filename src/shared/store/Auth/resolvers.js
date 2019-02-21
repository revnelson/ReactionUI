import { authQuery } from "./queries";

export const setUser = (_, { user }, { cache }) => {
  console.log("Resolver: ", user);
  const data = {
    auth: {
      id: user.id,
      username: user.username || "",
      createdAt: user.createdAt || "",
      updatedAt: user.updatedAt || "",
      name: user.name || "",
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
      name: "",
      __typename: "auth"
    }
  };

  cache.writeData({ data });
  return null;
};
