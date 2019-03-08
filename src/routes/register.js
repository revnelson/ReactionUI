import React from "react";
import Helmet from "react-helmet-async";
import { MyForm } from "../components/registerForm";

const RegisterPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <div
        css={tw`flex flex-wrap justify-center content-center min-h-screen border-0 -mt-8`}
      >
        <MyForm />
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
