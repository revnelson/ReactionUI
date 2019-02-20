import gql from "graphql-tag";

export const setUserMutation = gql`
  mutation setUserId($userId: User) {
    setUserId(userId: $userId) @client
  }
`;
