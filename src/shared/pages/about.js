import React from "react";
import Helmet from "react-helmet-async";
import Page from "../lib/page";
import { Wrapper } from "../style/wrapper";
import { Query } from "react-apollo";
import { fetchUserQuery } from "../api";
import { Spin, Alert } from "antd";

const About = ({ auth }) => (
  <Wrapper>
    <Helmet>
      <title>About Page</title>
    </Helmet>
    {auth.id && (
      <Query query={fetchUserQuery}>
        {({ loading, error, data }) => {
          return (
            <Spin spinning={!loading}>
              <Alert
                description="This is the about page"
                message={
                  loading
                    ? "Loading..."
                    : data && data.getUser
                    ? `Hello ${data.getUser.username}!`
                    : error
                    ? error
                    : "Error fetching users"
                }
                type="info"
              />
            </Spin>
          );
        }}
      </Query>
    )}
  </Wrapper>
);

export default Page()(About);
