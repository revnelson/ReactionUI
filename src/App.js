import React from "react";
import Helmet from "react-helmet-async";
import { AppLayout } from "./containers/layout/index";
import { Routes } from "./routes";
import { useTranslation } from "react-i18next";
import { GlobalStyle } from "./style/globalStyle";

const App = () => {
  const [i18n] = useTranslation();
  return (
    <React.Fragment>
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      <GlobalStyle />
      <AppLayout>
        <Routes />
      </AppLayout>
    </React.Fragment>
  );
};

export default App;
