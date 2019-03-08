import { authStore } from "../store/Auth";

// Add store imports above ^

/**
 * Local Data Stores
 */
const STORES = [authStore];

/**
 * Map the Mutation handlers and Default Values of our local state
 */

// Merge all defaults
export const data = Object.assign(...STORES.map(store => store.defaults));

// Merge all mutations
export const resolvers = {
  Mutation: Object.assign(...STORES.map(store => store.mutations))
};
