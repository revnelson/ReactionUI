import React from "react";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import chainedBackend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import { withApollo } from "react-apollo";
import { appConfig } from "../config";
import { withLangStore } from "../store/Lang";
import { isServer } from "../lib";

const namespaces = ["common", "auth"];

if (!isServer) {
  const chainedBrowserBackend = new chainedBackend(null, {
    backends: [
      LocalStorageBackend, // primary
      XHR // fallback
    ],
    backendOptions: [
      {
        prefix: `${appConfig.siteName}-lang-`,
        expirationTime: 1000 * 60 * 60 * 24 * 28, // 28 days
        // language versions (i.e. {en: '1.2'}) to override expiration time
        versions: {},
        store: window.localStorage
      },
      {
        loadPath: "./locales/{{lng}}/{{ns}}.json" // xhr load path for fallback
      }
    ]
  });
  i18next.use(chainedBrowserBackend);
  i18next.use(initReactI18next);
  i18next.use(LanguageDetector);
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

// class I18N extends React.PureComponent {
//   componentDidMount() {
//     i18next.changeLanguage(this.props.lang.locale);
//   }

//   componentDidUpdate(prevProps) {
//     const { locale: newLocale } = this.props.lang;
//     const { locale: oldLocale } = prevProps.lang;

//     if (oldLocale !== newLocale) {
//       i18next.changeLanguage(newLocale);
//     }
//   }

//   render() {
//     return (
//       <I18nextProvider i18n={i18next}>{this.props.children}</I18nextProvider>
//     );
//   }
// }

// export default withApollo(withLangStore(I18N));
