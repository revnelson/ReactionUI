import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import importComponent from "react-imported-component";
import { LoadingComponent } from "../components/loading";
import { ErrorComponent } from "../components/error";

const Home = importComponent(
  () => import(/* webpackChunkName: 'home' */ "./home"),
  {
    LoadingComponent,
    ErrorComponent
  }
);

const About = importComponent(
  () => import(/* webpackChunkName: 'about' */ "./about"),
  {
    LoadingComponent,
    ErrorComponent
  }
);

const Login = importComponent(
  () => import(/* webpackChunkName: 'login' */ "./login"),
  {
    LoadingComponent,
    ErrorComponent
  }
);

const Register = importComponent(
  () => import(/* webpackChunkName: 'register' */ "./register"),
  {
    LoadingComponent,
    ErrorComponent
  }
);

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={() => <Home />} />
    <Route path="/about" component={() => <About />} />
    <Route path="/login" component={() => <Login />} />
    <Route path="/register" component={() => <Register />} />
    <Redirect to="/" />
  </Switch>
);
