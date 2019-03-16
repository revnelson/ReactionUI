import gql from "graphql-tag";

const userModel = gql`
  {
    id
    username
    createdAt
    updatedAt
    name {
      en
      zh
      de
      es
      it
      fr
      ru
      uk
    }
  }
`;

export const fetchUsersQuery = gql`
  query {
    users ${userModel}
  }
`;

export const fetchUserQuery = gql`
  query fetchUser {
    getUser ${userModel}
  }
`;

export const checkAuthQuery = gql`
  query {
    checkAuth ${userModel}
  }
`;

export const registerUserMutation = gql`
  mutation registerUser($user: UserInput!) {
    registerUser(user: $user) ${userModel}
  }
`;

export const loginUserMutation = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user ${userModel}
    }
  }
`;

export const logoutUserMutation = gql`
  mutation logoutUser {
    logoutUser
  }
`;
