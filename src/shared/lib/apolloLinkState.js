import { langStore } from "../store/Lang";
import { authStore } from "../store/Auth";
import { withClientState } from "apollo-link-state";

/**
 * Local Data Stores
 */
const STORES = [langStore, authStore];

/**
 * Map the Mutation handlers and Default Values of our local state to
 * the Apollo cache.
 */
export const clientStore = cache => {
  // Merge all defaults
  const defaults = Object.assign(...STORES.map(store => store.defaults));

  // Merge all mutations
  const mutations = Object.assign(...STORES.map(store => store.mutations));

  // Construct the Client State with the given mutations and defaults
  return withClientState({
    cache,
    defaults,
    resolvers: {
      /*
       * These mutations relate to graphql mutations with the @client decorator
       * by function name.
       */
      Mutation: mutations
    }
  });
};
