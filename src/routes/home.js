import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ReactComponent as ReactLogo } from "../icons/brands/react.svg";
import { useApp } from "../lib/hooks";

const divStyle = tw`w-full flex justify-center p-3`;

const Home = () => {
  const { setAlert } = useApp();
  const [t] = useTranslation(["common", "auth"]);

  const makeAlert = status => {
    setAlert({
      title: t("auth:email-error"),
      message: t("error"),
      status
    });
  };

  const buttonStyle = tw`rounded-full bg-white border-4 shadow p-4 my-4 md:mx-4 hover:bg-grey-l4`;

  return (
    <div css={tw`flex flex-col justify-center items-center`}>
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
        <h1>React SSR {t("framework")}</h1>
      </div>
      <div css={divStyle} className="flex flex-col">
        <h2>{t("i18n-example")}</h2>
      </div>
      <div css={tw`flex mt-8 flex-col md:flex-row`}>
        <button
          css={buttonStyle}
          css={tw`border-blue-l2`}
          onClick={() => makeAlert("info")}
          className="transition"
        >
          Info Alert
        </button>
        <button
          css={buttonStyle}
          css={tw`border-red-l1`}
          onClick={() => makeAlert("danger")}
          className="transition"
        >
          Danger Alert
        </button>
        <button
          css={buttonStyle}
          css={tw`border-green-l1`}
          onClick={() => makeAlert("success")}
          className="transition"
        >
          Success Alert
        </button>
      </div>
    </div>
  );
};

export default Home;
