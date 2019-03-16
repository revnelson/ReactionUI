import express from "express";
import bodyParser from "body-parser";
import path from "path";
import chalk from "chalk";
import morgan from "morgan";
import PrettyError from "pretty-error";
import fsBackend from "i18next-node-fs-backend";
import i18nextMiddleware from "i18next-express-middleware";
import i18n from "../../src/i18n";
import { SSR } from "./serverRender";
import config from "../config";

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

const SITE_NAME = process.env.SITE_NAME;

const lngDetector = new i18nextMiddleware.LanguageDetector(null, {
  // order and from where user language should be detected
  order: [/*'path', 'session', */ "querystring", "cookie", "header"],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: `${SITE_NAME}-language`,
  // lookupSession: 'lng',
  // lookupPath: 'lng',
  // lookupFromPathIndex: 0,

  // cache user language
  caches: ["cookie"],

  // optional expire and domain for set cookie
  cookieExpirationDate: new Date(),
  cookieDomain: `${SITE_NAME}-language`,
  cookieSecure: false // if need secure cookie
});

const namespaces = ["common", "auth", "features"];

const app = express();

app.set("trust proxy", config.trustProxy);

i18n
  .use(fsBackend)
  .use(lngDetector)
  .init(
    {
      debug: false,
      preload: namespaces,
      ns: namespaces,
      defaultNS: "common",
      backend: {
        loadPath: "src/i18n/locales/{{lng}}/{{ns}}.json",
        addPath: "src/i18n/locales/{{lng}}/{{ns}}.missing.json"
      }
    },
    () => {
      // Use Nginx or Apache to serve static assets in production or remove the if() around the following
      // lines to use the express.static middleware to serve assets for production (not recommended!)
      if (process.env.STATIC_SERVER) {
        app.use(express.static(path.resolve(__dirname, "public")));
        // app.use("/favicon.ico", (req, res) => {
        //   res.send("");
        // });
      }

      // app.disable("x-powered-by");

      app.use(i18nextMiddleware.handle(i18n));

      // app.use(bodyParser.urlencoded({ extended: true }));
      // app.use(bodyParser.json());

      app.use(morgan("tiny"));

      app.get("*", SSR);

      //
      // Error handling
      // -----------------------------------------------------------------------------
      const pe = new PrettyError();
      pe.skipNodeFiles();
      pe.skipPackage("express");

      // eslint-disable-next-line no-unused-vars
      app.use((err, req, res, next) => {
        console.error(pe.render(err));
        const html = ReactDOM.renderToStaticMarkup(
          <Html
            title="Internal Server Error"
            description={err.message}
            styles={[{ id: "css", cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
          >
            {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
          </Html>
        );
        res.status(err.status || 500);
        res.send(`<!doctype html>${html}`);
      });

      if (!module.hot) {
        app.listen(process.env.PORT || 8383, async () => {
          console.log(
            `[${new Date().toISOString()}]`,
            chalk.blue(
              `App is running: 🌎 ${process.env.HOST ||
                "http://localhost"}:${process.env.PORT || 8500}`
            )
          );
        });
      }

      if (module.hot) {
        app.hot = module.hot;
        module.hot.accept();
      }
    }
  );

export default app;
