import express from "express";
import compression from "compression";
import path from "path";
import chalk from "chalk";
import morgan from "morgan";
import manifestHelpers from "./middleware/manifest-helpers";
import serverRender from "./render";
import paths from "../../config/paths";

require("dotenv").config();

const app = express();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === "development") {
  app.use(
    paths.publicPath,
    express.static(path.join(paths.clientBuild, paths.publicPath))
  );
  app.use("/favicon.ico", (req, res) => {
    res.send("");
  });
}

app.use(compression({ level: 6 }));

app.use(express.json());

app.use(morgan("combined"));

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`
  })
);

app.get("/*", serverRender);

app.use((err, req, res, next) => {
  return res.status(404).json({
    status: "error",
    message: err.message,
    stack:
      // print a nicer stack trace by splitting line breaks and making them array items
      process.env.NODE_ENV === "development" &&
      (err.stack || "")
        .split("\n")
        .map(line => line.trim())
        .map(line => line.split(path.sep).join("/"))
        .map(line =>
          line.replace(
            process
              .cwd()
              .split(path.sep)
              .join("/"),
            "."
          )
        )
  });
});

app.listen(process.env.PORT || 8383, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(
      `App is running: 🌎 ${process.env.HOST || "http://localhost"}:${process
        .env.PORT || 8500}`
    )
  );
});

export default app;
