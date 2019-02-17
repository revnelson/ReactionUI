import gql from "graphql-tag";

export const langQuery = gql`
  query getLangState {
    lang @client {
      locale
    }
  }
`;
