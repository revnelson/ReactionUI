const fs = require("fs");
const lessToJs = require("less-vars-to-js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const pkg = require("../../package.json");

const reStyle = /\.(css|less|scss|sss)$/;

const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, "../../src/shared/style/antd.less"),
    "utf8"
  )
);

const isDev = process.env === "development";

const babelLoader = {
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  loader: require.resolve("babel-loader"),
  options: {
    presets: [
      [
        "@babel/env",
        {
          targets: {
            browsers: pkg.browserList,
            uglify: true
          },
          modules: false,
          useBuiltIns: false,
          debug: false
        }
      ],
      "@babel/preset-react"
    ],
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
  test: /\.(eot|woff|woff2|ttf|png|jpe?g|gif|svg)$/,
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
  exclude: [/\.(js|css|less|mjs|html|ejs|json)$/],
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
  exclude: [/\.(js|css|less|mjs|html|ejs|json)$/],
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

const lessLoader = {
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      { loader: "css-loader", options: { sourceMap: true } },
      {
        loader: "less-loader",
        options: { javascriptEnabled: true, sourceMap: true }
      }
    ]
  })
};

// Only use babel-plugin-import in client side
const clientBabelLoader = { ...babelLoader };

// Only use babel-plugin-import in client side
clientBabelLoader.options.plugins = [
  ...clientBabelLoader.options.plugins,
  ["import", { libraryName: "antd", style: true }]
];

const client = [
  {
    oneOf: [
      clientBabelLoader,
      urlLoaderClient,
      fileLoaderClient,
      apolloFix,
      lessLoader
    ]
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
