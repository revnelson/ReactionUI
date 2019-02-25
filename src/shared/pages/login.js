import React from "react";
import Helmet from "react-helmet-async";
import { withPage } from "../lib";
import { Wrapper } from "../style/wrapper";
import { LoginForm } from "../components/loginForm";

const LoginPage = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Login Page</title>
      </Helmet>

      <LoginForm />
    </Wrapper>
  );
};

export default withPage("en")(LoginPage);
