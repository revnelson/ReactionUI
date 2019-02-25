import React from "react";
import { ApolloProvider } from "react-apollo";
import { apolloBrowserInit } from "../shared/lib";

export class ApolloPersistor extends React.Component {
  state = {
    client: null,
    loaded: false
  };

  async componentDidMount() {
    try {
      const client = await apolloBrowserInit();

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
