import webpack from "webpack";
import dotenv from "dotenv";
import nodeExternals from "webpack-node-externals";
import overrideRules from "./lib/overrideRules";
import { BUILD_DIR, config, isDebug, reImage, reStyle } from "./webpack.base";

dotenv.config();

export const serverConfig = {
  ...config,

  name: "server",
  target: "node",

  entry: {
    server: ["@babel/polyfill", "./ssr/server/server.js"]
  },

  output: {
    ...config.output,
    path: BUILD_DIR,
    filename: "[name].js",
    chunkFilename: "chunks/[name].js",
    libraryTarget: "commonjs2"
  },

  resolve: {
    ...config.resolve
  },

  module: {
    ...config.module,

    rules: overrideRules(config.module.rules, rule => {
      // Override babel-preset-env configuration for Node.js
      if (rule.loader === "babel-loader") {
        return {
          ...rule,
          options: {
            ...rule.options,
            presets: rule.options.presets.map(preset =>
              preset[0] !== "@babel/preset-env"
                ? preset
                : [
                    "@babel/preset-env",
                    {
                      targets: {
                        node: "current"
                      },
                      modules: false,
                      useBuiltIns: false,
                      debug: false
                    }
                  ]
            ),
            plugins: [
              ...rule.options.plugins,
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        };
      }

      // Override paths to static assets
      if (
        rule.loader === "file-loader" ||
        rule.loader === "url-loader" ||
        rule.loader === "svg-url-loader"
      ) {
        return {
          ...rule,
          options: {
            ...rule.options,
            emitFile: false
          }
        };
      }

      return rule;
    })
  },

  externals: [
    "./chunk-manifest.json",
    "./asset-manifest.json",
    nodeExternals({
      whitelist: [reStyle, reImage]
    })
  ],

  plugins: [
    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      "process.env.BROWSER": false,
      "process.env.GOOGLE_ID": process.env.GOOGLE_ID,
      "process.env.HOST": process.env.HOST,
      "process.env.NODE_ENV": process.env.NODE_ENV,
      "process.env.PORT": process.env.PORT,
      "process.env.SERVER_API_URI": process.env.SERVER_API_URI,
      "process.env.SITE_NAME": process.env.SITE_NAME,
      "process.env.STATIC_SERVER": process.env.STATIC_SERVER,
      __DEV__: isDebug
    }),

    // Adds a banner to the top of each generated chunk
    // https://webpack.js.org/plugins/banner-plugin/
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],

  // Do not replace node globals with polyfills
  // https://webpack.js.org/configuration/node/
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
};
