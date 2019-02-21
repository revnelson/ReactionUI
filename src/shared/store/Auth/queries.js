import gql from "graphql-tag";

export const authQuery = gql`
  query getAuth {
    auth @client {
      id
      username
      createdAt
      updatedAt
      name
    }
  }
`;
