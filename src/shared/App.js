import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GlobalStyles } from "./style/global";
import importComponent from "react-imported-component";
import LoadingComponent from "./pages/loading";
import ErrorComponent from "./pages/error";
import Layout from "./containers/layout";
import Home from "./pages/home";

const About = importComponent(() => import("./pages/about"), {
  LoadingComponent,
  ErrorComponent
});

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={() => <About />} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
