import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet } from "styled-components";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { I18nextProvider } from "react-i18next";
import log from "llog";
import through from "through";
import App from "../shared/App";
import { getHTMLFragments } from "./client";
import { apolloServerInit } from "../shared/lib";
import { checkCookie } from "./auth";
import { ApolloUserInjector } from "./apolloServer";

export function write(data) {
  this.queue(data);
}

export const end = endingHTMLFragment =>
  function end() {
    this.queue(endingHTMLFragment);
    this.queue(null);
  };

export const SSR = (req, res) => {
  const helmetContext = {};
  const context = {};
  const { token, user } = checkCookie(req.headers.cookie);
  const client = apolloServerInit(token);
  const sheet = new ServerStyleSheet();
  const content = sheet.collectStyles(
    <ApolloProvider client={client}>
      <ApolloUserInjector user={user}>
        <HelmetProvider context={helmetContext}>
          <I18nextProvider i18n={req.i18n}>
            <StaticRouter location={req.originalUrl} context={context}>
              <App />
            </StaticRouter>
          </I18nextProvider>
        </HelmetProvider>
      </ApolloUserInjector>
    </ApolloProvider>
  );
  try {
    getDataFromTree(content)
      .then(() => {
        const stream = sheet.interleaveWithNodeStream(
          renderToNodeStream(content)
        );
        if (context.url) {
          return res.redirect(301, context.url);
        }
        const { helmet } = helmetContext;

        const [startingHTMLFragment, endingHTMLFragment] = getHTMLFragments(
          helmet
        );

        res.status(200);
        res.write(startingHTMLFragment);
        stream.pipe(through(write, end(endingHTMLFragment))).pipe(res);
      })
      .catch(e => {
        log.error(e);
        console.log(e);
        res.status(500);
        res.end();
      });
  } catch (e) {
    log.error(e);
    res.status(500);
    res.end();
  }
};
