import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import IntlProvider from "../shared/i18n/IntlProvider";
import importedComponents from "./imported";
import { HelmetProvider } from "react-helmet-async";
import { rehydrateMarks } from "react-imported-component";
import { initApollo } from "../shared/lib";
import { ApolloProvider } from "react-apollo";

const initialState = window.__APOLLO_STATE__;
const client = initApollo(initialState);
const element = document.getElementById("app");
const app = (
  <HelmetProvider>
    <ApolloProvider client={client}>
      <IntlProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IntlProvider>
    </ApolloProvider>
  </HelmetProvider>
);

rehydrateMarks().then(() => {
  hydrate(app, element);
});

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
