import { graphql } from "react-apollo";
import compose from "recompose/compose";
import { defaults } from "./defaults";
import * as queries from "./queries";
import * as mutations from "./mutations";
import * as resolvers from "./resolvers";

const authStore = {
  defaults,
  mutations: {
    ...resolvers
  }
};

const authQueryHandler = {
  props: ({ ownProps, data: { auth = {} } }) => ({
    ...ownProps,
    auth
  })
};

const handler = [graphql(queries["authQuery"], authQueryHandler)];

const graphMutations = Object.keys(mutations).map(mutation =>
  graphql(mutations[mutation], { name: mutation })
);

const toCompose = handler.concat(graphMutations);

const withAuthStore = compose(...toCompose);

export { authStore, mutations, queries, withAuthStore };
