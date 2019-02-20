import React from "react";
import { Wrapper } from "../style/wrapper";
import Helmet from "react-helmet-async";

const Error = () => (
  <Wrapper>
    <Helmet>
      <title>Error!</title>
    </Helmet>
    Error! Please refresh to try again.
  </Wrapper>
);
export default Error;
