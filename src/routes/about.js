import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useAuth } from "../lib/hooks";

const About = () => {
  const [t] = useTranslation("common");
  const { auth } = useAuth();

  return (
    <React.Fragment>
      <Helmet>
        <title>About Page</title>
      </Helmet>
      {auth.id && auth.username
        ? `Hello ${auth.username}!`
        : error
        ? error
        : "Error fetching users"}
    </React.Fragment>
  );
};

export default About;
