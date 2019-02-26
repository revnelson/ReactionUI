import React from "react";

export const HTML = ({ children, helmet, locals }) => (
  <html lang="">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {locals.getStylesheets().map(href => {
        return <link key={href} rel="stylesheet" href={href} />;
      })}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
      {locals.getJavascripts().map(src => {
        return <script key={src} src={src} />;
      })}
    </body>
  </html>
);
