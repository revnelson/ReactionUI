import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Wrapper } from "../style/wrapper";
import ReactLogo from "../assets/react.svg";

const Home = () => {
  const [t, i18n] = useTranslation("common");

  const setLanguage = e => {
    i18n.changeLanguage(e.target.value);
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

export default Home;
