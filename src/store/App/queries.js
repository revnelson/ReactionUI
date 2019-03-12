import gql from "graphql-tag";

export const appQuery = gql`
  query getAppState {
    app @client {
      sidebar
    }
  }
`;
