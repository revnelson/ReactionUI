import React from "react";
import Helmet from "react-helmet-async";
import { Redirect } from "react-router-dom";
import { LoginForm } from "../components/loginFormik";
import { useAuth } from "../lib/hooks";

const LoginPage = () => {
  const { loggedIn } = useAuth();

  if (loggedIn) return <Redirect to={{ pathname: "/about" }} />;

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
