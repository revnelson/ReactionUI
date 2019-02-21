import React from "react";
import { Header } from "./header";

export default ({ children }) => (
  <React.Fragment>
    <Header />
    {children}
  </React.Fragment>
);
