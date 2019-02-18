import React from "react";
import Helmet from "react-helmet-async";
import Page from "../components/page";
import { Wrapper } from "../style/wrapper";
import { ReactComponent as ReactLogo } from "../assets/react.svg";
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
        <button value="de_DE" onClick={setLanguage}>
          Deutsch
        </button>
        <button value="en_US" onClick={setLanguage}>
          English
        </button>
      </p>
    </Wrapper>
  );
};

export default Page("en")(withLangStore(Home));