import { renderToNodeStream } from "react-dom/server";
import { getDataFromTree } from "react-apollo";
import { ServerStyleSheet } from "styled-components";
import log from "llog";
import through from "through";
import { apolloServerInit } from "../../src/lib";
import { checkCookie } from "./auth";
import { HTML } from "./HTML";
import { serverApp } from "./serverApp";

export function write(data) {
  this.queue(data);
}

export const end = endingHTMLFragment =>
  function end() {
    this.queue(endingHTMLFragment);
    this.queue(null);
  };

export const SSR = async (req, res) => {
  const { token, user } = checkCookie(req.headers.cookie);
  const client = apolloServerInit(token);

  const context = {};
  const helmetContext = {};

  const sheet = new ServerStyleSheet();

  const ServerApp = serverApp(client, context, helmetContext, req, sheet, user);

  try {
    getDataFromTree(ServerApp)
      .then(() => {
        if (context.url) {
          res.redirect(301, context.url);
        } else {
          const apolloData = client.extract();

          const { helmet } = helmetContext;

          const { startingHTMLFragment, endingHTMLFragment } = HTML(
            apolloData,
            helmet
          );

          const stream = sheet.interleaveWithNodeStream(
            renderToNodeStream(ServerApp)
          );

          res.status(200);
          res.write(startingHTMLFragment);
          stream.pipe(
            res,
            { end: false }
          );
          stream.on("end", () => res.end(endingHTMLFragment));
          // stream.pipe(through(write, end(endingHTMLFragment))).pipe(res);
        }
      })
      .catch(e => {
        log.error(e);
        console.log(e);
        res.status(500);
        res.end();
      });
  } catch (e) {
    log.error(e);
    console.log(e);
    res.status(500);
    res.end();
  }
};
