import gql from "graphql-tag";

export const authQuery = gql`
  query getAuth {
    auth @client {
      userId
      email
      name
    }
  }
`;

// export const getUserQuery = gql`
//   query getUser {
//     getUser {
//       user {
//         id
//         email
//       }
//     }
//   }
// `;
