const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = require("../env")();

const shared = [];

const client = [
  // TODO: add client side only mode
  // new HtmlWebpackPlugin({
  //     inject: true,
  //     template: paths.appHtml,
  // }),
  new CaseSensitivePathsPlugin(),
  new webpack.DefinePlugin(env.stringified),
  new webpack.DefinePlugin({
    __SERVER__: "false",
    __BROWSER__: "true"
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ManifestPlugin({ fileName: "manifest.json" })
];

const server = [
  new webpack.DefinePlugin({
    __SERVER__: "true",
    __BROWSER__: "false"
  })
];

module.exports = {
  shared,
  client,
  server
};
