import dotenv from "dotenv";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Observable } from "apollo-link";
import { CachePersistor } from "apollo-cache-persist";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import fetch from "isomorphic-unfetch";
import { clientStore } from "./apolloLinkState";

dotenv.config();

const { BROWSER_API_URI, SERVER_API_URI, SITE_NAME } = process.env;

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

export const apolloBrowserInit = async user => {
  const serverLink = new HttpLink({
    uri: BROWSER_API_URI,
    credentials: "include",
    fetch
  });

  const link = ApolloLink.from([
    errorMiddleware,
    requestLink,
    clientStore(cache),
    serverLink
  ]);

  const cache = new InMemoryCache();

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
    key: SITE_NAME
  });

  const persistedJSON =
    window.localStorage[SITE_NAME] &&
    JSON.parse(window.localStorage[SITE_NAME]);

  const rootQuery = (persistedJSON && persistedJSON.ROOT_QUERY) || "";
  const authQuery = (rootQuery && rootQuery.auth) || "";
  const authQueryId = (authQuery && authQuery.id) || "";
  const persistedAuthStore = (authQueryId && persistedJSON[authQueryId]) || "";
  const persistedId = (persistedAuthStore && persistedAuthStore.id) || "";

  (!user.id && persistedId) || (persistedId && user.id !== persistedId)
    ? await persistor.purge()
    : await persistor.restore();

  return new ApolloClient({
    ssrMode: false,
    link,
    cache
  });
};

export const apolloServerInit = token => {
  const serverLink = new HttpLink({
    uri: SERVER_API_URI,
    headers: {
      Authorization: token ? token : ""
    },
    fetch
  });
  const cache = new InMemoryCache();
  const link = ApolloLink.from([
    errorMiddleware,
    requestLink,
    clientStore(cache),
    serverLink
  ]);

  return new ApolloClient({ ssrMode: true, link, cache });
};
