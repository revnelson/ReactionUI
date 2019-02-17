import React from "react";
import Helmet from "react-helmet-async";
import Page from "../components/page";
import { Wrapper } from "../style/wrapper";

const About = () => (
  <Wrapper>
    <Helmet>
      <title>About Page</title>
    </Helmet>

    <div>This is the about page</div>
  </Wrapper>
);

export default Page()(About);
