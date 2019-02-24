import React from "react";
import Helmet from "react-helmet-async";
import { Query } from "react-apollo";
import { Spin, Alert } from "antd";
import Page from "../lib/page";
import { Wrapper } from "../style/wrapper";
import { ReactComponent as ReactLogo } from "../assets/react.svg";
import { withLangStore } from "../store/Lang";
import { fetchUserQuery } from "../api";

const Home = ({ changeLocaleMutation, t }) => {
  const setLanguage = e => {
    const locale = e.target.value;
    changeLocaleMutation({ variables: { locale } });
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <h1>
        <ReactLogo /> React + Express – SSR Starter
      </h1>

      <h2>{t("i18n-example")}</h2>
      <p>
        <button value="de_DE" onClick={setLanguage}>
          Deutsch
        </button>
        <button value="en_US" onClick={setLanguage}>
          English
        </button>
      </p>
      <Query query={fetchUserQuery}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <Spin spinning={!loading}>
              <Alert
                description="This is the about page"
                message={
                  loading
                    ? "Loading..."
                    : data && data.getUser
                    ? `Hello ${data.getUser.username}!`
                    : "Error fetching users"
                }
                type="info"
              />
            </Spin>
          );
        }}
      </Query>
    </Wrapper>
  );
};

export default Page("en")(withLangStore(Home));
