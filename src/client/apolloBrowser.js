import React from "react";
import { ApolloProvider } from "react-apollo";
import { apolloBrowserInit } from "../shared/lib";
import { mutations } from "../shared/store/Auth";
import { checkAuthQuery } from "../shared/api";

class PersistorContainer extends React.Component {
  state = {
    client: null,
    loaded: false
  };

  // check the users auth cookie and set the global user state
  checkAuth = async client => {
    const { data } = await client.query({ query: checkAuthQuery });
    const { user } = data && data.checkAuth ? data.checkAuth : "";
    user &&
      client.mutate({
        mutation: mutations.setUserMutation,
        variables: { user }
      });
  };

  async componentDidMount() {
    try {
      const client = await apolloBrowserInit();

      await this.checkAuth(client);

      await this.setState({
        client,
        loaded: true
      });
    } catch (err) {
      console.log("Error restoring Apollo cache: ", err);
    }
  }

  render() {
    const { client, loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    }
    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    );
  }
}

export const ApolloPersist = PersistorContainer;
