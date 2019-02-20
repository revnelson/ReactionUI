import React from "react";
import { Wrapper } from "../style/wrapper";
import Helmet from "react-helmet-async";

const Loading = () => (
  <Wrapper>
    <Helmet>
      <title>Loading...</title>
    </Helmet>
    Loading...
  </Wrapper>
);
export default Loading;
