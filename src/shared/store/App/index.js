import { graphql } from "react-apollo";
import compose from "recompose/compose";
import { defaults } from "./defaults";
import * as queries from "./queries";
import * as mutations from "./mutations";
import * as resolvers from "./resolvers";

export * from "./queries";
export * from "./mutations";

const appStore = {
  defaults,
  mutations: {
    ...resolvers
  }
};

const appQueryHandler = {
  props: ({ ownProps, data: { app = {} } }) => ({
    ...ownProps,
    app
  })
};

const handler = [graphql(queries["appQuery"], appQueryHandler)];
const graphs = Object.keys(mutations).map(query =>
  graphql(mutations[query], { name: query })
);

const toCompose = handler.concat(graphs);

const withAppStore = compose(...toCompose);

export { appStore, withAppStore };
