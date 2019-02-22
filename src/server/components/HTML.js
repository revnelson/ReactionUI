import React from "react";

export default class HTML extends React.Component {
  static defaultProps = {
    css: [],
    scripts: []
  };

  render() {
    // const head = Helmet.renderStatic();
    const { children, apolloData, css, helmet, locals, scripts } = this.props;
    return (
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
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_USER__=${JSON.stringify(
                apolloData
              ).replace(/</g, "\\u003c")};`
            }}
          />
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {locals.getJavascripts().map(src => {
            return <script key={src} src={src} />;
          })}
        </body>
      </html>
    );
  }
}
