module.exports = {
  compact: true,
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: ["last 2 versions", "ie >= 9"]
        }
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true
      }
    ],
    ["import", { libraryName: "antd", style: true }]
  ],
  env: {
    server: {
      plugins: [
        "react-imported-component/babel",
        "@babel/plugin-syntax-dynamic-import"
      ]
    },
    client: {
      plugins: ["react-imported-component/babel"]
    }
  }
};
