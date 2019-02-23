import React from "react";
import Helmet from "react-helmet-async";
import Page from "../lib/page";
import { Wrapper } from "../style/wrapper";
import { withApollo } from "react-apollo";
import { fetchUserQuery } from "../api";
import { Spin, Alert } from "antd";

const About = async ({ auth, client }) => {
  if (auth.id) {
    const { data } = await client.query({ query: fetchUserQuery });
    spinner = data => {
      data && (
        <Spin spinning={!data}>
          <Alert
            description="This is the about page"
            message={
              !data
                ? "Loading..."
                : data.getUser
                ? `Hello ${data.getUser.username}!`
                : "Error fetching users"
            }
            type="info"
          />
        </Spin>
      );
    };
    return (
      <Wrapper>
        <Helmet>
          <title>About Page</title>
        </Helmet>
        {data && spinner(data)}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Helmet>
        <title>About Page</title>
      </Helmet>
      <div>Please log in to view this page.</div>
    </Wrapper>
  );
};

export default Page()(withApollo(About));
