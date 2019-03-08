import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { UserInjector } from "./apolloUserInjector";
import { ApolloPersistor } from "./apolloBrowser";
import App from "../../src/App";
import { useSSR } from "react-i18next";
import "../../src/i18n";

export const ClientApp = () => {
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
