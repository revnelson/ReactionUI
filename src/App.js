import React from "react";
import Helmet from "react-helmet-async";
import { AppLayout } from "./containers/layout/index";
import { Routes } from "./routes";
import { useTranslation } from "react-i18next";
import { GlobalStyle } from "./style/globalStyle";
import moment from "moment";

const App = () => {
  const [t, i18n] = useTranslation();
  const locale = i18n.language === "zh" ? "zh-cn" : i18n.language;
  moment.locale(locale);
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
