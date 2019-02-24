const paths = require("../paths");
const { client: clientLoaders } = require("./loaders");
const resolvers = require("./resolvers");
const plugins = require("./plugins");

module.exports = {
  name: "client",
  target: "web",
  entry: {
    bundle: [require.resolve("@babel/polyfill"), `${paths.srcClient}/index.js`]
  },
  output: {
    path: paths.clientBuild,
    filename: "bundle.js",
    publicPath: paths.publicPath,
    chunkFilename: `${paths.publicPath.slice(
      1
    )}scripts/[name].[chunkhash:8].chunk.js`
  },
  module: {
    rules: clientLoaders
  },
  resolve: { ...resolvers },
  plugins: [...plugins.shared, ...plugins.client],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
          chunks: "all"
        }
      }
    }
  },
  stats: {
    cached: true,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false
  }
};
