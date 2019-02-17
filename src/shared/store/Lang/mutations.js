import gql from "graphql-tag";

export const changeLocaleMutation = gql`
  mutation changeLocale($locale: String) {
    changeLocale(locale: $locale) @client
  }
`;
