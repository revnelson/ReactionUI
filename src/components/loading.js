import React from "react";
import Helmet from "react-helmet-async";

export const LoadingComponent = () => (
  <React.Fragment>
    <Helmet>
      <title>Loading...</title>
    </Helmet>
    Loading...
  </React.Fragment>
);
