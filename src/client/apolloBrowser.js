import React from "react";
import { ApolloProvider } from "react-apollo";
import { apolloBrowserInit, checkCookie } from "../shared/lib";
import { mutations } from "../shared/store/Auth";

class PersistorContainer extends React.Component {
  state = {
    client: null,
    loaded: false,
    user: false
  };

  // check the users auth cookie and set the global user state
  checkAuthCookie = (client, user) => {
    // do auth stuff ... and then
    checkCookie();
    // const user = {};
    user &&
      client.mutate({
        mutation: mutations.setUserMutation,
        variables: { user }
      });
  };

  async componentDidMount() {
    const user = window.__APOLLO_USER__ || "";
    try {
      const client = await apolloBrowserInit(user);

      await this.checkAuthCookie(client, user);

      await this.setState({
        client,
        loaded: true
      });
    } catch (err) {
      console.log("Error restoring Apollo cache: ", err);
    }
  }

  render() {
    const { client, loaded, user } = this.state;
    if (loaded && !user) {
      this.checkAuthCookie(client);
    }
    if (!loaded) {
      return <div>Loading...</div>;
    }
    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    );
  }
}

export const ApolloPersist = PersistorContainer;
