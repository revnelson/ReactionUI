const fs = require("fs");
const path = require("path");
const paths = require("./paths");

const { env } = process;

delete require.cache[require.resolve("./paths")];

if (!env.NODE_ENV) {
  throw new Error(
    "The env.NODE_ENV environment variable is required but was not specified."
  );
}

const dotenvFiles = [
  `${paths.dotenv}.${env.NODE_ENV}.local`,
  `${paths.dotenv}.${env.NODE_ENV}`,
  env.NODE_ENV !== "test" && `${paths.dotenv}.local`,
  paths.dotenv
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require("dotenv").config({
      path: dotenvFile
    });
  }
});

const appDirectory = fs.realpathSync(process.cwd());
env.NODE_PATH = (env.NODE_PATH || "")
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

module.exports = () => {
  const raw = {
    PORT: env.PORT || 3333,
    NODE_ENV: env.NODE_ENV || "development",
    HOST: env.HOST || "http://localhost",
    BROWSER_API_URI: env.BROWSER_API_URI || "http://localhost:4343",
    SITE_NAME: env.SITE_NAME || "ReactionUI"
  };

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };

  return { raw, stringified };
};
