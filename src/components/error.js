import React from "react";
import Helmet from "react-helmet-async";

export const ErrorComponent = () => (
  <React.Fragment>
    <Helmet>
      <title>Error!</title>
    </Helmet>
    Error! Please refresh to try again.
  </React.Fragment>
);
