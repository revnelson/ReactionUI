import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import Home from "./pages/home";
import { ReactComponent as ReactLogo } from "./assets/react.svg";
import { GlobalStyles } from "./styles";
import importComponent from "react-imported-component";
import LoadingComponent from "./pages/loading";
import ErrorComponent from "./pages/error";
import Header from "./components/header";
import { withLangStore } from "./store/Lang";

const About = importComponent(() => import("./pages/about"), {
  LoadingComponent,
  ErrorComponent
});
// const About = lazy(() => import("./pages/about"));

const App = ({ changeLocaleQuery, t }) => {
  const setLanguage = e => {
    const locale = e.target.value;
    changeLocaleQuery({ variables: { locale } });
  };
  return (
    <div>
      <GlobalStyles />

      {/* <h1>
        <ReactLogo className={css.reactLogo} /> React + Express – SSR Starter
      </h1>


      <h2>{t("i18n-example")}</h2>
      <p>
        <button value="de_DE" onClick={setLanguage}>
          Deutsch
        </button>
        <button value="en_US" onClick={setLanguage}>
          English
        </button>
      </p> */}
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={() => <About />} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default withNamespaces()(withLangStore(App));
