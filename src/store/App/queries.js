import gql from "graphql-tag";

export const appQuery = gql`
  query getAppState {
    app @client {
      alert {
        title
        message
        status
        redirect
        timeout
      }
      sidebar
    }
  }
`;
