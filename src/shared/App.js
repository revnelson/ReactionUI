import React from "react";
import Helmet from "react-helmet-async";
import { GlobalStyles } from "./style/global";
import Layout from "./containers/layout";
import { withLangStore } from "./store/Lang";
import { Routes } from "./routes";

const App = ({ lang }) => (
  <React.Fragment>
    <Helmet htmlAttributes={{ lang: lang.locale }} />
    <GlobalStyles />
    <Layout>
      <Routes />
    </Layout>
  </React.Fragment>
);

export default withLangStore(App);
