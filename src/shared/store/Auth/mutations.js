import gql from "graphql-tag";

export const setUserMutation = gql`
  mutation setUser($user: User) {
    setUser(user: $user) @client
  }
`;

export const clearUserMutation = gql`
  mutation clearUser {
    clearUser @client
  }
`;
