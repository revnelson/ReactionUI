# ReactionUI

Admin Dashboard + SSR + Auth + Apollo + i18n + styled-components

## Features

Server-side rendering using `imported-components` and `ReactDOM.hydrate()`

Apollo Graphql for API calls

Apollo Link State for local stores

i18n localization

React Helmet Async - Dynamically set the `lang` attribute of the HTML tag.

plop - Easily add Apollo Link State stores, pages, and styled components

** All of the commands below using `yarn` can be swapped for `npm run` if that's your preference **

## Deployment

PM2 - `yarn pm2` or `npm run pm2` will build the project and name it in pm2 according to the name you set at the top of your `package.json` file. You can also use `yarn pm2:restart` or `npm run pm2:restart` to build the project and restart the server, as well as `yarn pm2:stop` or `npm run pm2:stop` if you need to stop the server from running in the pm2 service.

Git - Simply use the `yarn git-up` or `npm run git-up` script to stop the server running in pm2, pull git updates, build the project, and start the server in pm2 again.

## Plop

Use the `yarn plop` command to access the plop menu. From here you can easily generate what would otherwise be tedious additions to your projects.

## Apollo Link State

Apollo Link State is included in lieu of Redux to have a more uniform method of requesting data throughout the site, whether it's local data or data from an API (GraphQL Server). The most complicated bit tends to be the setup. This is mitigated by the use of plop which will add a new store folder for you in `src/shared/store`, generate individual files for queries, mutations and resolvers. The plop service also links it all up to the Apollo Provider so it's ready to be used.

To use a store, wrap a component with its `with{{StoreName}}Store` (i.e. `withLangStore`) function, which is exported from each plop-generated store. Once wrapped, the component with receive the store as an object as well as all mutations and queries as props. You shouldn't need queries within components as you can access the store data via something like `this.props.lang.locale`. They are useful for use within resolvers or when removing then `@client` directive to get data from an API server in your components. Calling a mutation looks something like `this.props.changeLocaleMutation({ variables: { locale: "en_US" }})`. No need for a return as `this.props.lang.locale` will reflect the updated value, but returns are possible.

e.g.

```
import React from "react";
import { withLangStore } from "../store/Lang";

export default withLangStore(({ lang, changeLocaleMutation }) => (
  <button onClick={() => changeLocaleMutation({ variables: { locale: "en_US" }})}>
    {lang.locale}
  </button>
));
```

If you just need mutations or queries from a store to be used programmatically in a function, you can import them like `import { mutations } from "../store/Lang";`. You can then do something like:

```
import { ApolloClient as client } from "apollo-client";
import { mutations } from "../store/Lang";

function changeLocale = (locale) => {
  client.mutate({ mutation: mutations.changeLocaleMutation, variables: { locale }});
};
```

Each store exports a component wrapper, a mutations object, and a queries object. If you need more than one store's mutations or queries objects in a file, you will need to import them `as` like `import { mutations as langMutations } from "../store/Lang";`.

## Auth

The `loginUser` mutation expects to send `{ username, password }` as its variables (both as strings) and return a `{ token, user }` object. Upon return the app will store the token as a cookie with the name set in `/src/shared/config/app.js`. Modify this if it doesn't match your API schema.

On each page load, the app will check for a cookie and set a userId if present. This allows for first-load authentication to load (or not load) routes/components based on logged-in status. It's up to you to ensure your API handles security properly and issues a JWT token you trust.

## Acknowledgments

Most of this is a mash up of these guides to get this specific combination of tools working.

- [Patrick Lee Scott](https://hackernoon.com/move-over-next-js-and-webpack-ba367f07545)
- [Manuel Bieh](https://github.com/manuelbieh/react-ssr-setup)
- [Patrick Cason](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e)

```

```
