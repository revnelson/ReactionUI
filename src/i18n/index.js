import React from "react";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import chainedBackend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import { isServer } from "../lib";

const namespaces = ["common", "auth"];

const SITE_NAME = process.env.SITE_NAME;

if (!isServer) {
  const langDetector = new LanguageDetector(null, {
    // order and from where user language should be detected
    order: [
      "querystring",
      "cookie",
      "navigator",
      "localStorage",
      "htmlTag",
      "path",
      "subdomain"
    ],

    // keys or params to lookup language from
    lookupQuerystring: "lng",
    lookupCookie: `${SITE_NAME}-language`,
    lookupLocalStorage: `${SITE_NAME}-language`,
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ["localStorage", "cookie"],
    excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: `${SITE_NAME}-language`,

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement
  });

  const chainedBrowserBackend = new chainedBackend(null, {
    backends: [
      LocalStorageBackend, // primary
      XHR // fallback
    ],
    backendOptions: [
      {
        prefix: `${SITE_NAME}-lang-`,
        expirationTime: 1000 * 60 * 60 * 24 * 7, // 7 days
        // language versions (i.e. {en: '1.2'}) to override expiration time
        versions: {},
        store: window.localStorage
      },
      {
        loadPath: "./assets/locales/{{lng}}/{{ns}}.json" // xhr load path for fallback
      }
    ]
  });
  i18next.use(chainedBrowserBackend);
  i18next.use(initReactI18next);
  i18next.use(langDetector);
}

const options = {
  debug: false,
  defaultNS: "common",
  fallbackLng: "en",
  fallbackNS: ["common"],
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
    format: (value, format, lng) => {
      if (format === "uppercase") return value.toUpperCase();
      return value;
    }
  },
  load: "languageOnly",
  ns: namespaces,
  parseMissingKeyHandler: missing => {
    if (process.env.NODE_ENV === "development") {
      console.warn("MISSING TRANSLATION:", missing);
    }
    return missing;
  },
  react: {
    useSuspense: false
  },
  wait: process && !process.release
};

if (!i18next.isInitialized) {
  i18next.init(options);
}

export default i18next;
