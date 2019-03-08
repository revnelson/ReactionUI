import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloUserInjector } from "./apolloServer";
import App from "../../src/App";

export const serverApp = (client, context, helmetContext, req, sheet, user) =>
  sheet.collectStyles(
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ApolloUserInjector user={user}>
          <HelmetProvider context={helmetContext}>
            <StaticRouter location={req.url} context={context}>
              <I18nextProvider i18n={req.i18n}>
                <App />
              </I18nextProvider>
            </StaticRouter>
          </HelmetProvider>
        </ApolloUserInjector>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
