import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Observable } from "apollo-link";
import { CachePersistor } from "apollo-cache-persist";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import fetch from "isomorphic-unfetch";
import { data, resolvers } from "./apolloLinkState";

const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }
  if (networkError) {
    console.log(networkError);
  }
});

const request = async operation => {
  // console.log(operation);
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export const apolloBrowserInit = async () => {
  const serverLink = new HttpLink({
    uri: process.env.BROWSER_API_URI,
    credentials: "include",
    fetch
  });

  const link = ApolloLink.from([errorMiddleware, requestLink, serverLink]);

  const cache = new InMemoryCache();

  cache.writeData({ data });

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
    key: process.env.SITE_NAME
  });

  await persistor.restore();

  const client = new ApolloClient({
    cache,
    link,
    resolvers,
    ssrMode: false
  });

  client.onResetStore(() => cache.writeData({ data }));

  return client;
};

export const apolloServerInit = token => {
  const serverLink = new HttpLink({
    uri: process.env.SERVER_API_URI,
    headers: {
      Authorization: token ? token : ""
    },
    fetch
  });

  const cache = new InMemoryCache();

  cache.writeData({ data });

  const link = ApolloLink.from([errorMiddleware, requestLink, serverLink]);

  return new ApolloClient({ cache, link, resolvers, ssrMode: true });
};
