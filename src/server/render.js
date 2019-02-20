import React from "react";
import { renderToString, renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheet } from "styled-components";
import IntlProvider from "../shared/i18n/IntlProvider";
import HTML from "./components/HTML";
import App from "../shared/App";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { initApollo } from "../shared/lib";
import { printDrainHydrateMarks } from "react-imported-component";
import log from "llog";

const serverRenderer = (req, res) => {
  let helmetContext = {};
  let routerContext = {};
  const sheet = new ServerStyleSheet();
  const apolloClient = initApollo();
  const content = sheet.collectStyles(
    <ApolloProvider client={apolloClient}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url} context={routerContext}>
          <IntlProvider>
            <App />
          </IntlProvider>
        </StaticRouter>
      </HelmetProvider>
    </ApolloProvider>
  );

  getDataFromTree(content)
    .then(() => {
      if (routerContext.url) {
        res.redirect(301, routerContext.url);
      } else {
        const data = apolloClient.extract();

        const { helmet } = helmetContext;

        const html =
          "<!DOCTYPE html>" +
          renderToString(
            <HTML
              css={[
                res.locals.assetPath("bundle.css"),
                res.locals.assetPath("vendor.css")
              ]}
              scripts={[
                res.locals.assetPath("bundle.js"),
                res.locals.assetPath("vendor.js")
              ]}
              helmet={helmet}
              apolloData={data}
            />
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
