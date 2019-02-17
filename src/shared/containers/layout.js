import React from "react";
import Header from "../components/header";

export default ({ children }) => (
  <React.Fragment>
    <Header />
    {children}
  </React.Fragment>
);
