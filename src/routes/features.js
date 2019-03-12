import React, { useEffect } from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useApp } from "../lib/hooks";

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
      An outline of the various features of this starter project.
    </React.Fragment>
  );
};

export default About;
