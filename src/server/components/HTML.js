import React from "react";

export default class HTML extends React.Component {
  static defaultProps = {
    css: [],
    scripts: [],
    state: "{}"
  };

  render() {
    // const head = Helmet.renderStatic();
    const { children, apolloData, css, helmet, scripts } = this.props;
    return (
      <html lang="">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {css.map(href => {
            return <link key={href} rel="stylesheet" href={href} />;
          })}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {scripts.map(src => {
            return <script key={src} src={src} />;
          })}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(apolloData)}`
            }}
          />
        </body>
      </html>
    );
  }
}
