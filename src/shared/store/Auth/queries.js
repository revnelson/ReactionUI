import gql from "graphql-tag";

export const authQuery = gql`
  {
    auth @client {
      id
      username
      createdAt
      updatedAt
      name
    }
  }
`;
