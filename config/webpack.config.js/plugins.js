const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const env = require("../env")();

const shared = [];

const client = [
  // TODO: add client side only mode
  // new HtmlWebpackPlugin({
  //   title: env.raw.SITE_NAME
  // }),
  new ExtractTextPlugin({
    filename: getPath => {
      return getPath("css/[name].css").replace("css/js", "css");
    },
    allChunks: true
  }),
  new CaseSensitivePathsPlugin(),
  new webpack.DefinePlugin(env.stringified),
  new webpack.DefinePlugin({
    __SERVER__: "false",
    __BROWSER__: "true"
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ManifestPlugin({ fileName: "manifest.json" }),
  new CompressionPlugin({
    test: /\.js$|\.css$|\.html$/,
    threshold: 8192
  })
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
