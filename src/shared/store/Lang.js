import gql from "graphql-tag";
import { graphql } from "react-apollo";
import compose from "recompose/compose";
/*
  Defaults // Initial State
*/

const defaults = {
  lang: {
    locale: "en",
    __typename: "lang"
  }
};

/*
  GraphQL // Declare Types
*/

export const langQuery = gql`
  query getLangState {
    lang @client {
      locale
    }
  }
`;

// export const styleQuery = gql`
//   query getAppStyle {
//     app @client {
//       style
//     }
//   }
// `;

const changeLocaleQuery = gql`
  mutation changeLocale($locale: String) {
    changeLocale(locale: $locale) @client
  }
`;

/*
  Cache Mutations // Actions & Reducer
*/

const changeLocale = (_, { locale }, { cache }) => {
  const data = {
    lang: {
      locale,
      __typename: "lang"
    }
  };

  cache.writeData({ data });
  return null;
};

/*
  Store
*/

/**
 * The Store object used to construct
 * Apollo Link State's Client State
 */
const langStore = {
  defaults,
  mutations: {
    changeLocale
  }
};

/*
  Helpers
*/

const langQueryHandler = {
  props: ({ ownProps, data: { lang = {} } }) => ({
    ...ownProps,
    lang
  })
};

const withLangStore = compose(
  graphql(langQuery, langQueryHandler),
  graphql(changeLocaleQuery, { name: "changeLocaleQuery" })
);

export { langStore, withLangStore };
