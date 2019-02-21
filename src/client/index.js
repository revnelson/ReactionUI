import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import IntlProvider from "../shared/i18n/IntlProvider";
import importedComponents from "./imported";
import { HelmetProvider } from "react-helmet-async";
import { rehydrateMarks } from "react-imported-component";
import { ApolloPersist } from "./apolloBrowser";

const element = document.getElementById("app");
const app = (
  <HelmetProvider>
    <ApolloPersist>
      <IntlProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IntlProvider>
    </ApolloPersist>
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
