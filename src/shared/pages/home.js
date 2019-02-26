import React from "react";
import Helmet from "react-helmet-async";
import { withPage } from "../lib";
import { Wrapper } from "../style/wrapper";
import ReactLogo from "../assets/react.svg";
import { withLangStore } from "../store/Lang";

const Home = ({ changeLocaleMutation, t }) => {
  const setLanguage = e => {
    const locale = e.target.value;
    changeLocaleMutation({ variables: { locale } });
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <h1>
        <ReactLogo /> React + Express – SSR Starter
      </h1>

      <h2>{t("i18n-example")}</h2>
      <p>
        <button value="de" onClick={setLanguage}>
          Deutsch
        </button>
        <button value="en" onClick={setLanguage}>
          English
        </button>
      </p>
    </Wrapper>
  );
};

export default withPage()(withLangStore(Home));
