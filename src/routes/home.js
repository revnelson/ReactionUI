import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ReactComponent as ReactLogo } from "../icons/brands/react.svg";

const divStyle = tw`w-full md:w-1/2 xl:w-1/3 p-3`;

const Home = () => {
  const [t] = useTranslation("common");

  return (
    <React.Fragment>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div css={divStyle}>
        <ReactLogo
          css={tw`h-16 w-16 fill-current text-primary hover:text-fourth inline-block`}
          className="transition"
        />
      </div>
      <div css={divStyle}>
        <h1>React + Express – SSR Starter</h1>
      </div>
      <div css={divStyle} className="flex flex-col">
        <h2>{t("i18n-example")}</h2>
      </div>
    </React.Fragment>
  );
};

export default Home;
