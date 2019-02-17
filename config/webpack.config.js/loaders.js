const babelLoader = {
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  loader: require.resolve("babel-loader"),
  options: {
    plugins: [
      [
        require.resolve("babel-plugin-named-asset-import"),
        {
          loaderMap: {
            svg: {
              ReactComponent: "@svgr/webpack?-prettier,-svgo![path]"
            }
          }
        }
      ]
    ],
    cacheDirectory: true,
    cacheCompression: process.env.NODE_ENV === "production",
    compact: process.env.NODE_ENV === "production"
  }
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve("url-loader"),
  options: {
    limit: 2048,
    name: "assets/[name].[hash:8].[ext]"
  }
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false
  }
};

const fileLoaderClient = {
  exclude: [/\.(js|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve("file-loader"),
      options: {
        name: "assets/[name].[hash:8].[ext]"
      }
    }
  ]
};

const fileLoaderServer = {
  exclude: [/\.(js|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve("file-loader"),
      options: {
        name: "assets/[name].[hash:8].[ext]",
        emitFile: false
      }
    }
  ]
};

const apolloFix = {
  test: /.mjs$/,
  include: /node_modules/,
  type: "javascript/auto"
};

const client = [
  {
    oneOf: [babelLoader, urlLoaderClient, fileLoaderClient, apolloFix]
  }
];
const server = [
  {
    oneOf: [babelLoader, urlLoaderServer, fileLoaderServer]
  }
];

module.exports = {
  client,
  server
};
