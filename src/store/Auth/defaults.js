import { langs } from "../../../config";

let names = {};

Object.keys(langs).map(key => {
  names[key] = "";
});

export const defaults = {
  auth: {
    id: "",
    username: "",
    createdAt: "",
    updatedAt: "",
    name: {
      ...names,
      __typename: "name"
    },
    __typename: "auth"
  }
};
