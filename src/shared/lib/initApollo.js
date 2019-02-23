import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { CachePersistor } from "apollo-cache-persist";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { clientStore } from "./apolloLinkState";

const { BROWSER_API_URI, SERVER_API_URI, SITE_NAME } = process.env;

export const apolloBrowserInit = async user => {
  const serverLink = createHttpLink({
    uri: BROWSER_API_URI,
    credentials: "include"
  });

  const link = ApolloLink.from([clientStore(cache), serverLink]);

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
  const serverLink = createHttpLink({
    uri: SERVER_API_URI,
    headers: {
      Authorization: token ? token : ""
    },
    credentials: "include",
    fetch
  });
  const cache = new InMemoryCache();

  const link = ApolloLink.from([clientStore(cache), serverLink]);

  return new ApolloClient({ ssrMode: true, link, cache });
};
