import express from "express";
import compression from "compression";
import path from "path";
import chalk from "chalk";
import morgan from "morgan";
import { SSR } from "./render";

require("dotenv").config();

const app = express();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.STATIC_SERVER === "true") {
  app.use("/", express.static(path.join("build/client")));
  // app.use("/favicon.ico", (req, res) => {
  //   res.send("");
  // });
}

app.use(compression({ level: 6 }));

app.use(morgan("tiny"));

app.get("/*", SSR);

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
