import React from "react";
import { withApollo } from "react-apollo";
import { checkAuthQuery } from "../shared/api";
import { queries, withAuthStore } from "../shared/store/Auth";

class UserInjectorWithoutClient extends React.Component {
  async componentDidMount() {
    // check the users auth cookie and set the global user state
    try {
      const { client, setUserMutation } = this.props;
      const setUser = await client.readQuery({ query: queries.authQuery })
        .authQuery;
      if (!setUser) {
        const { data } = await client.query({ query: checkAuthQuery });
        const { user } = data && data.checkAuth ? data.checkAuth : "";
        user && setUserMutation({ variables: { user } });
      }
    } catch (err) {
      console.log("Error injecting user: ", err);
    }
  }
  render() {
    return this.props.children;
  }
}

export const UserInjector = withApollo(
  withAuthStore(UserInjectorWithoutClient)
);
