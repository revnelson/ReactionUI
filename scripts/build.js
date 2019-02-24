const webpack = require("webpack");
const rimraf = require("rimraf");
const paths = require("../config/paths");

const webpackConfig = require("../config/webpack.config.js")(
  process.env.NODE_ENV || "production"
);

const { logMessage, compilerPromise } = require("./utils");

const build = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const [clientConfig, serverConfig] = webpackConfig;
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find(
    compiler => compiler.name === "client"
  );
  const serverCompiler = multiCompiler.compilers.find(
    compiler => compiler.name === "server"
  );

  const clientPromise = compilerPromise("client", clientCompiler);
  const serverPromise = compilerPromise("server", serverCompiler);

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }
  });

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
      return;
    }
  });

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
    // await generateStaticHTML();
    await process.exit("Building completed!");
    logMessage("Done!", "info");
  } catch (error) {
    logMessage(error, "error");
  }
};

build();
