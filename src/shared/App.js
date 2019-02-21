import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Helmet from "react-helmet-async";
import importComponent from "react-imported-component";
import { GlobalStyles } from "./style/global";
import LoadingComponent from "./components/loading";
import ErrorComponent from "./components/error";
import Layout from "./containers/layout";
import { checkAuth, isServer } from "./lib";
import { withLangStore } from "./store/Lang";
import { withApollo } from "react-apollo";
import { withAuthStore } from "./store/Auth";

const Home = importComponent(() => import("./pages/home"), {
  LoadingComponent,
  ErrorComponent
});

const About = importComponent(() => import("./pages/about"), {
  LoadingComponent,
  ErrorComponent
});

class App extends React.Component {
  render() {
    const { auth, lang } = this.props;
    return (
      <React.Fragment>
        <Helmet htmlAttributes={{ lang: lang.locale }} />
        <GlobalStyles />
        <Layout>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route path="/about" component={() => <About />} />
            <Redirect to="/" />
          </Switch>
          {auth.id && "Ya logged in!"}
        </Layout>
      </React.Fragment>
    );
  }
}

export default withLangStore(withAuthStore(App));
