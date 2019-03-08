import path from "path";
import pkg from "../package.json";

const ROOT_DIR = path.resolve(__dirname, "..");
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath("src");
const SSR_DIR = resolvePath("ssr");
export const BUILD_DIR = resolvePath("build");

export const isDebug = !process.argv.includes("--release");
const isVerbose = process.argv.includes("--verbose");

export const reImage = /\.(bmp|gif|jpg|jpeg|png)$/;
export const reScript = /\.(js|jsx|mjs)$/;
export const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const staticAssetName = isDebug ? "[name].[ext]?[hash:8]" : "[hash:8].[ext]";

// CSS Nano options http://cssnano.co/
const minimizeCssOptions = {
  discardComments: { removeAll: true }
};
//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

export const config = {
  context: ROOT_DIR,

  mode: isDebug ? "development" : "production",

  output: {
    path: resolvePath(BUILD_DIR, "public/assets"),
    publicPath: "/assets/",
    pathinfo: isVerbose,
    filename: isDebug ? "[name].js" : "[name].[chunkhash:8].js",
    chunkFilename: isDebug
      ? "[name].chunk.js"
      : "[name].[chunkhash:8].chunk.js",
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },

  resolve: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // Keep in sync with .flowconfig and .eslintrc
    modules: ["node_modules", "src", "ssr"]
  },

  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      // Rules for JS / JSX
      {
        test: reScript,
        include: [SRC_DIR, SSR_DIR, resolvePath("tools")],
        loader: "babel-loader",
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isDebug,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          configFile: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: pkg.browserslist
                },
                forceAllTransforms: !isDebug, // for UglifyJS
                modules: false,
                useBuiltIns: false,
                debug: false
              }
            ],
            // JSX
            // https://github.com/babel/babel/tree/master/packages/babel-preset-react
            ["@babel/preset-react", { development: isDebug }]
          ],
          plugins: [
            // Experimental ECMAScript proposals
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            "babel-plugin-styled-components",
            "react-imported-component/babel",
            "@babel/plugin-proposal-optional-chaining",
            // Treat React JSX elements as value types and hoist them to the highest scope
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-constant-elements
            // TODO - FIND OUT WHY IT CAUSES ERROR
            // ...(isDebug ? [] : ["@babel/transform-react-constant-elements"]),
            // Replaces the React.createElement function with one that is more optimized for production
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
            ...(isDebug ? [] : ["@babel/transform-react-inline-elements"]),
            // Remove unnecessary React propTypes from the production build
            // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
            ...(isDebug ? [] : ["transform-react-remove-prop-types"]),
            [
              "tailwind-components",
              {
                config: "./src/style/tailwind.js",
                format: "auto"
              }
            ]
          ]
        }
      },

      // Rules for Style Sheets
      {
        test: reStyle,
        rules: [
          // Convert CSS into JS module
          {
            issuer: { not: [reStyle] },
            use: "isomorphic-style-loader"
          },

          // Process external/third-party styles
          {
            exclude: SRC_DIR,
            loader: "css-loader",
            options: {
              sourceMap: isDebug
              // minimize: isDebug ? false : minimizeCssOptions
            }
          },

          // Process internal/project styles (from src folder)
          {
            include: SRC_DIR,
            loader: "css-loader",
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 1,
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug
                ? "[name]-[local]-[hash:base64:5]"
                : "[hash:base64:5]"
              // CSS Nano http://cssnano.co/
              // minimize: isDebug ? false : minimizeCssOptions
            }
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "./tools/postcss.config.js"
              }
            }
          }

          // Compile Less to CSS
          // https://github.com/webpack-contrib/less-loader
          // Install dependencies before uncommenting: yarn add --dev less-loader less
          // {
          //   test: /\.less$/,
          //   loader: 'less-loader',
          // },

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          // {
          //   test: /\.(scss|sass)$/,
          //   loader: 'sass-loader',
          // },
        ]
      },

      // Rules for images
      {
        test: reImage,
        oneOf: [
          // Inline lightweight images into CSS
          {
            issuer: reStyle,
            oneOf: [
              // Inline lightweight SVGs as UTF-8 encoded DataUrl string
              {
                test: /\.svg$/,
                loader: "svg-url-loader",
                options: {
                  name: staticAssetName,
                  limit: 4096 // 4kb
                }
              },

              // Inline lightweight images as Base64 encoded DataUrl string
              {
                loader: "url-loader",
                options: {
                  name: staticAssetName,
                  limit: 4096 // 4kb
                }
              }
            ]
          },

          // Or return public URL to image resource
          {
            loader: "file-loader",
            options: {
              name: staticAssetName
            }
          }
        ]
      },

      // Convert plain text into JS module
      {
        test: /\.txt$/,
        loader: "raw-loader"
      },
      {
        test: /\.svg$/,
        loader: "@svgr/webpack",
        options: {
          name: staticAssetName,
          limit: 4096 // 4kb
        }
      },

      // Convert Markdown into HTML
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, "./lib/markdown-loader.js")
      },

      // Return public URL for all assets unless explicitly excluded
      // DO NOT FORGET to update `exclude` list when you adding a new loader
      {
        exclude: [reScript, reStyle, reImage, /\.json$/, /\.txt$/, /\.md$/],
        loader: "file-loader",
        options: {
          name: staticAssetName
        }
      },

      // Exclude dev modules from production build
      ...(isDebug
        ? []
        : [
            {
              test: resolvePath(
                "node_modules/react-deep-force-update/lib/index.js"
              ),
              loader: "null-loader"
            }
          ])
    ]
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,

  // Specify what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDebug,
    timings: true,
    version: isVerbose
  },

  // Choose a developer tool to enhance debugging
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: isDebug ? "cheap-module-inline-source-map" : "source-map"
};
