import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Query } from "react-apollo";
import { withAuthStore } from "../store/Auth";
import { Wrapper } from "../style/wrapper";
import { queries } from "../store/Auth";
import { Spin, Alert } from "antd";

const About = ({ auth }) => {
  const [t] = useTranslation("common");

  return (
    <Wrapper>
      <Helmet>
        <title>About Page</title>
      </Helmet>
      {auth.id && (
        <Query query={queries.authQuery}>
          {({ loading, error, data: { auth } }) => {
            return (
              <Spin spinning={loading}>
                <Alert
                  description="This is the about page"
                  message={
                    loading
                      ? "Loading..."
                      : auth.username
                      ? `Hello ${auth.username}!`
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
};

export default withAuthStore(About);
