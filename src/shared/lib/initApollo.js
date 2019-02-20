import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { clientStore } from "./apolloLinkState";
import { isServer } from "./";

const { BROWSER_API_URI, SERVER_API_URI } = process.env;

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const uri = isServer ? SERVER_API_URI : BROWSER_API_URI;

const serverLink = createHttpLink({
  uri,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmNiMmRlYjlmOWM0MDAwNzIxNWZiNCIsInVzZXJuYW1lIjoibWljaGFlbCIsImlhdCI6MTU1MDYyNzYyMSwiZXhwIjoxNTUzMjE5NjIxfQ.r6t-n7I3yvrIAgF_swdE1eudjwPb5GEHOqsl7kZRq8A"
  },
  credentials: "same-origin"
});

function create(initialState) {
  const cache = new InMemoryCache().restore(initialState || {});

  const link = ApolloLink.from([clientStore(cache), serverLink]);

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache
  });
}

export const initApollo = (initialState, options) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
};
