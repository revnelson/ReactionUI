// @flow
import React from "react";
import i18next from "i18next";
import { withRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { withApollo } from "react-apollo";

import deDE from "./locales/de_DE.json";
import enUS from "./locales/en_US.json";
import { withLangStore } from "../store/Lang";

i18next.init({
  fallbackLng: "en_US",
  fallbackNS: ["translation"],
  resources: {
    de_DE: deDE,
    en_US: enUS
  },
  parseMissingKeyHandler: missing => {
    if (process.env.NODE_ENV === "development") {
      console.warn("MISSING TRANSLATION:", missing);
    }
    return missing;
  }
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
