import gql from "graphql-tag";

export const fetchUsersQuery = gql`
  query {
    users {
      id
      username
      createdAt
      updatedAt
    }
  }
`;

export const fetchUserQuery = gql`
  query {
    getUser {
      id
      username
      createdAt
      updatedAt
    }
  }
`;

export const registerUserMutation = gql`
  mutation registerUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;

export const loginUserMutation = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
        createdAt
        updatedAt
      }
    }
  }
`;
