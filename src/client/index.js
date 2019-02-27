import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { rehydrateMarks } from "react-imported-component";
import { useSSR } from "react-i18next";
import importedComponents from "./imported";
import { UserInjector } from "./apolloUserInjector";
import { ApolloPersistor } from "./apolloBrowser";
import "../shared/i18n";
import App from "../shared/App";

const element = document.getElementById("app");
const BaseApp = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);
  return (
    <HelmetProvider>
      <ApolloPersistor>
        <UserInjector>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserInjector>
      </ApolloPersistor>
    </HelmetProvider>
  );
};

rehydrateMarks().then(() => {
  hydrate(<BaseApp />, element);
});

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
