import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import importedComponents from "./imported";
import { HelmetProvider } from "react-helmet-async";
import { rehydrateMarks } from "react-imported-component";
import { UserInjector } from "./apolloUserInjector";
import IntlProvider from "../shared/i18n/IntlProvider";
import { ApolloPersistor } from "./apolloBrowser";
import App from "../shared/App";

const element = document.getElementById("app");
const app = (
  <HelmetProvider>
    <ApolloPersistor>
      <UserInjector>
        <IntlProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </IntlProvider>
      </UserInjector>
    </ApolloPersistor>
  </HelmetProvider>
);

rehydrateMarks().then(() => {
  hydrate(app, element);
});

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
