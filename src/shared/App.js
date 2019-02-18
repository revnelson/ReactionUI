import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Helmet from "react-helmet-async";
import { GlobalStyles } from "./style/global";
import importComponent from "react-imported-component";
import LoadingComponent from "./pages/loading";
import ErrorComponent from "./pages/error";
import Layout from "./containers/layout";
import { withLangStore } from "./store/Lang";

const Home = importComponent(() => import("./pages/home"), {
  LoadingComponent,
  ErrorComponent
});

const About = importComponent(() => import("./pages/about"), {
  LoadingComponent,
  ErrorComponent
});

const App = ({ lang }) => {
  return (
    <div>
      <Helmet htmlAttributes={{ lang: lang.locale }} />
      <GlobalStyles />
      <Layout>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/about" component={() => <About />} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
};

export default withLangStore(App);
