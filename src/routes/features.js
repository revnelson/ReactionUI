import React, { useEffect } from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useApp } from "../lib/hooks";
import { Utilities } from "../components/features/utilities";
import { Data } from "../components/features/data";
import { Styling } from "../components/features/styling";
import { Languages } from "../components/features/languages";

const About = () => {
  const [t] = useTranslation("common");
  const { sidebarToggle } = useApp();

  useEffect(() => {
    sidebarToggle(true);
    return () => sidebarToggle(false);
  });

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
