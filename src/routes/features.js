import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Utilities } from "../components/features/utilities";
import { Data } from "../components/features/data";
import { Styling } from "../components/features/styling";
import { Languages } from "../components/features/languages";

const About = () => {
  const [t] = useTranslation("common");

  return (
    <React.Fragment>
      <Helmet>
        <title>Features Page</title>
      </Helmet>
      <Data id="data" />
      <Styling id="styling" />
      <Languages id="languages" />
      <Utilities id="utilities" />
    </React.Fragment>
  );
};

export default About;
