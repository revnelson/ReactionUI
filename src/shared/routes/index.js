import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import importComponent from "react-imported-component";
import LoadingComponent from "../components/loading";
import ErrorComponent from "../components/error";

const Home = importComponent(() => import("../pages/home"), {
  LoadingComponent,
  ErrorComponent
});

const About = importComponent(() => import("../pages/about"), {
  LoadingComponent,
  ErrorComponent
});

const Login = importComponent(() => import("../pages/login"), {
  LoadingComponent,
  ErrorComponent
});

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={() => <Home />} />
    <Route path="/about" component={() => <About />} />
    <Route path="/login/:next?" component={() => <Login />} />
    <Redirect to="/" />
  </Switch>
);
