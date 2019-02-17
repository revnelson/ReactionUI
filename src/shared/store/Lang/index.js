import { graphql } from "react-apollo";
import compose from "recompose/compose";
import { defaults } from "./defaults";
import * as queries from "./queries";
import * as mutations from "./mutations";
import * as resolvers from "./resolvers";

const langStore = {
  defaults,
  mutations: {
    ...resolvers
  }
};

const langQueryHandler = {
  props: ({ ownProps, data: { lang = {} } }) => ({
    ...ownProps,
    lang
  })
};

const handler = [graphql(queries["langQuery"], langQueryHandler)];
const graphs = Object.keys(mutations).map(query =>
  graphql(mutations[query], { name: query })
);

const toCompose = handler.concat(graphs);

const withLangStore = compose(...toCompose);

export { langStore, withLangStore };
