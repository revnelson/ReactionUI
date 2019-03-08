import React from "react";
import { renderToString } from "react-dom/server";
import { printDrainHydrateMarks } from "react-imported-component";
import chunks from "./chunk-manifest.json";

const scriptsSet = new Set();
const addChunk = chunk => {
  if (chunks[chunk]) {
    chunks[chunk].forEach(asset => scriptsSet.add(asset));
  } else if (__DEV__) {
    throw new Error(`Chunk with name '${chunk}' cannot be found`);
  }
};
addChunk("client");

const scripts = Array.from(scriptsSet);
const requiredScripts = scripts.map(script => (
  <script key={script} src={script} />
));

export const HTML = (apolloData, helmet) => {
  const html =
    "<!DOCTYPE html>" +
    renderToString(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          {helmet.title.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png" />
        </head>
        <body
          css={tw`font-sans bg-near-white transparent leading-normal tracking-normal`}
        >
          <div id="app" dangerouslySetInnerHTML={{ __html: "" }} />
          {requiredScripts}
          {process.env.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  "window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;" +
                  `ga('create','${
                    process.env.googleTrackingId
                  }','auto');ga('send','pageview')`
              }}
            />
          )}
          {process.env.googleTrackingId && (
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />
          )}
        </body>
      </html>
    );

  const appString = '<div id="app">';
  const splitter = "###SPLIT###";
  const [startingRawHTMLFragment, endingHTMLFragment] = html
    .replace(appString, `${appString}${splitter}`)
    .split(splitter);

  const startingHTMLFragment = `${startingRawHTMLFragment}${printDrainHydrateMarks()}`;

  return { startingHTMLFragment, endingHTMLFragment };
};
