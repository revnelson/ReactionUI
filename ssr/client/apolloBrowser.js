import React, { useEffect, useState } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { apolloBrowserInit } from "../../src/lib";

// export const ApolloPersistor = ({ children }) => {
//   const [client, setClient] = useState(null);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     if (!client) {
//       apolloBrowserInit()
//         .then(client => {
//           setClient(client);
//           setLoaded(true);
//         })
//         .catch(err => console.log("Error restoring Apollo cache: ", err));
//     }
//   });

//   if (!loaded) {
//     return <div>Loading...</div>;
//   }
//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };

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
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          {this.props.children}
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}
