const paths = require("../paths");

module.exports = {
  extensions: [".js", ".mjs", ".json", ".jsx", ".css", ".less"],
  modules: paths.resolveModules
};
