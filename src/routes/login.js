import React from "react";
import Helmet from "react-helmet-async";
import { LoginForm } from "../components/loginFormik";

const LoginPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div
        css={tw`flex flex-wrap justify-center content-center min-h-screen border-0 -mt-8`}
      >
        {/* <Alert title="Test" message="This is a test" status="info" /> */}
        <LoginForm />
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
