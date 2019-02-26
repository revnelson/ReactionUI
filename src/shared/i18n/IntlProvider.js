// @flow
import React from "react";
import i18next from "i18next";
import { withRouter } from "react-router-dom";
import LngDetector from "i18next-browser-languagedetector";
import chainedBackend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import XHR from "i18next-xhr-backend";
import { I18nextProvider } from "react-i18next";
import { withApollo } from "react-apollo";
import { appConfig } from "../config";
import { withLangStore } from "../store/Lang";

const loadLocales = (url, options, callback, data) => {
  try {
    let waitForLocale = require("./locales/" + url + ".json");
    callback(waitForLocale, { status: "200" });
  } catch (e) {
    callback(null, { status: "404" });
  }
};

if (__BROWSER__) {
  const chainedBrowserBackend = new chainedBackend(null, {
    backends: [
      LocalStorageBackend, // primary
      XHR // fallback
    ],
    backendOptions: [
      {
        // prefix for stored languages
        prefix: `${appConfig.siteName}_i18n`,
        // expiration
        expirationTime: 1000 * 60 * 60 * 24 * 28, // 28 days
        // language versions (i.e. {en: '1.2'}) to override expiration time
        versions: {},

        store: window.localStorage
      },
      {
        loadPath: "{{lng}}/{{ns}}", // xhr load path for my own fallback
        parse: data => data,
        ajax: loadLocales
      }
    ]
  });
  i18next.use(chainedBrowserBackend);
}
if (__SERVER__) {
  const fsBackend = require("i18next-node-fs-backend");
  const FSBackend = new fsBackend(null, {
    loadPath: "src/shared/i18n/locales/{{lng}}/{{ns}}.json",
    addPath: "src/shared/i18n/locales/{{lng}}/{{ns}}.missing.json"
  });
  i18next.use(FSBackend);
}

i18next.use(LngDetector);
i18next.init({
  debug: false,
  defaultNS: "common",
  fallbackLng: "en",
  fallbackNS: ["common"],
  interpolation: {
    escapeValue: false
  },
  ns: ["common"],
  parseMissingKeyHandler: missing => {
    if (process.env.NODE_ENV === "development") {
      console.warn("MISSING TRANSLATION:", missing);
    }
    return missing;
  },
  whitelist: ["en", "de"]
});

class I18N extends React.PureComponent {
  componentDidMount() {
    i18next.changeLanguage(this.props.lang.locale);
  }

  componentDidUpdate(prevProps) {
    const { locale: newLocale } = this.props.lang;
    const { locale: oldLocale } = prevProps.lang;

    if (oldLocale !== newLocale) {
      i18next.changeLanguage(newLocale);
    }
  }

  render() {
    return (
      <I18nextProvider i18n={i18next}>{this.props.children}</I18nextProvider>
    );
  }
}

export default withApollo(withLangStore(I18N));
