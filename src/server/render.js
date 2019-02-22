import React from "react";
import { renderToString, renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { printDrainHydrateMarks } from "react-imported-component";
import log from "llog";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { ServerStyleSheet } from "styled-components";
import IntlProvider from "../shared/i18n/IntlProvider";
import HTML from "./components/HTML";
import App from "../shared/App";
import { apolloServerInit, checkCookie } from "../shared/lib";
import { ApolloUserInjector } from "./apolloServer";

const serverRenderer = (req, res) => {
  let helmetContext = {};
  let routerContext = {};
  const { token, user } = checkCookie(req.headers.cookie);
  const client = apolloServerInit(token);
  const sheet = new ServerStyleSheet();
  const content = sheet.collectStyles(
    <ApolloProvider client={client}>
      <ApolloUserInjector user={user}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={req.url} context={routerContext}>
            <IntlProvider>
              <App />
            </IntlProvider>
          </StaticRouter>
        </HelmetProvider>
      </ApolloUserInjector>
    </ApolloProvider>
  );

  getDataFromTree(content)
    .then(() => {
      if (routerContext.url) {
        res.redirect(301, routerContext.url);
      } else {
        const { helmet } = helmetContext;

        const html =
          "<!DOCTYPE html>" +
          renderToString(
            <HTML locals={res.locals} helmet={helmet} apolloData={user} />
          );
        const appString = '<div id="app">';
        const splitter = "###SPLIT###";
        const [startingRawHTMLFragment, endingHTMLFragment] = html
          .replace(appString, `${appString}${splitter}`)
          .split(splitter);
        const startingHTMLFragment = `${startingRawHTMLFragment}${printDrainHydrateMarks()}`;

        const stream = sheet.interleaveWithNodeStream(
          renderToNodeStream(content)
        );

        res.status(200);
        res.set("content-type", "text/html");
        res.write(startingHTMLFragment);
        stream.pipe(
          res,
          { end: false }
        );
        stream.on("end", () => res.end(endingHTMLFragment));
      }
    })
    .catch(e => {
      log.error(e);
      console.log(e);
      res.status(500);
      res.end();
    });
};

export default serverRenderer;
