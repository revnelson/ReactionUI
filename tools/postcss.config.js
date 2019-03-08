const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano");
const purgecss = require("@fullhuman/postcss-purgecss");

export default {
  plugins: [
    // require("postcss-import")({
    //   path: [paths.srcShared]
    // }),
    require("postcss-nested")(),
    require("postcss-custom-properties")(),
    require("postcss-flexbugs-fixes")(),
    tailwindcss("./src/style/tailwind.js"),
    // cssnano({
    //   preset: "default"
    // }),
    // process.env.NODE_ENV === "production" &&
    //   purgecss({
    //     content: ["./src/**/*.js"],
    //     css: ["./src/**/*.css"]
    //   }),
    require("autoprefixer")({
      browsers: ["last 3 versions", "ie >= 9", "Edge <= 15"]
    }),
    require("postcss-custom-properties")(),
    require("postcss-assets")({
      basePath: "./src/assets"
    }),
    require("postcss-normalize")()
  ],
  sourceMap: true
};
