import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import importComponent from "react-imported-component";
import { LoadingComponent } from "../components/loading";
import { ErrorComponent } from "../components/error";
import { ProtectedRoute } from "../lib/routeProtector";
import { useAuth } from "../lib/hooks";

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

const Logout = () => {
  const { logoutUser } = useAuth();
  logoutUser();
  return null;
};

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={() => <Home />} />
    <ProtectedRoute path="/about" component={() => <About />} />
    <ProtectedRoute
      publicOnly
      path="/login/:next?"
      component={() => <Login />}
    />
    <ProtectedRoute
      publicOnly
      path="/register"
      component={() => <Register />}
    />
    <ProtectedRoute path="/logout" component={Logout} />
    <Redirect to="/" />
  </Switch>
);
