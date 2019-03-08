import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { queries } from "../store/Auth";
import { useQuery } from "react-apollo-hooks";

const About = () => {
  const [t] = useTranslation("common");
  const {
    loading,
    error,
    data: { auth }
  } = useQuery(queries.authQuery);

  return (
    <React.Fragment>
      <Helmet>
        <title>About Page</title>
      </Helmet>
      {auth.id &&
        (loading
          ? "Loading..."
          : auth.username
          ? `Hello ${auth.username}!`
          : error
          ? error
          : "Error fetching users")}
    </React.Fragment>
  );
};

export default About;
