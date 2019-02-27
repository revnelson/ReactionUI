import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import path from "path";
import chalk from "chalk";
import morgan from "morgan";
import puppeteer from "puppeteer";
import fs from "fs";
import fsBackend from "i18next-node-fs-backend";
import i18nextMiddleware from "i18next-express-middleware";
import i18n from "../shared/i18n";
import { SSR } from "./render";

dotenv.config();

const { HOST, NODE_ENV, PORT, STATIC_SERVER } = process.env;

const namespaces = ["common", "auth"];

const app = express();

i18n
  .use(fsBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      debug: false,
      preload: namespaces,
      ns: namespaces,
      defaultNS: "common",
      backend: {
        loadPath: "src/shared/i18n/locales/{{lng}}/{{ns}}.json",
        addPath: "src/shared/i18n/locales/{{lng}}/{{ns}}.missing.json"
      }
    },
    () => {
      // Use Nginx or Apache to serve static assets in production or remove the if() around the following
      // lines to use the express.static middleware to serve assets for production (not recommended!)
      if (STATIC_SERVER === "true") {
        app.use("/", express.static(path.join("build/client")));
        // app.use("/favicon.ico", (req, res) => {
        //   res.send("");
        // });
      }

      app.disable("x-powered-by");

      app.use(i18nextMiddleware.handle(i18n));

      app.use(compression({ level: 6 }));

      app.use(morgan("tiny"));

      app.get("/*", SSR);

      app.use((err, req, res, next) => {
        return res.status(404).json({
          status: "error",
          message: err.message,
          stack:
            // print a nicer stack trace by splitting line breaks and making them array items
            NODE_ENV === "development" &&
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

      app.listen(PORT || 8383, async () => {
        console.log(
          `[${new Date().toISOString()}]`,
          chalk.blue(
            `App is running: 🌎 ${HOST || "http://localhost"}:${process.env
              .PORT || 8500}`
          )
        );

        // try {
        //   console.log("pullin the strings");
        //   const browser = await puppeteer.launch({
        //     args: ["--no-sandbox", "--disable-setuid-sandbox"]
        //   });
        //   const page = await browser.newPage();
        //   await page.goto(`http://localhost:${PORT}`);
        //   const pageContent = await page.content();
        //   fs.writeFileSync(`build/client/index.html`, pageContent);
        //   await browser.close();
        // } catch (err) {
        //   console.log(err);
        // }
      });
    }
  );

export default app;
