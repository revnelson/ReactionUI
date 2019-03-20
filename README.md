# ReactionUI

[Starter project](https://ui.revnelson.com) with: [SSR](https://github.com/theKashey/react-imported-component) + [API Auth](https://github.com/RevNelson/api-playground) + [Apollo](https://www.apollographql.com/docs/react/api/apollo-client.html) + [i18n](https://react.i18next.com) + [styled-components](https://www.styled-components.com/) + [Tailwind CSS](https://tailwindcss.com)

## Features

Server-side rendering using [react-imported-component](https://github.com/theKashey/react-imported-component) and `ReactDOM.hydrate()`

Apollo Graphql for API calls

Apollo Link State for local stores

React Hooks

i18n localization

React Helmet Async - Dynamically set the `lang` attribute of the HTML tag.

Tailwind CSS + Styled Components

plop - Easily add Apollo Link State stores, pages, and styled components

## Deployment

Configuration - Set your supported languages and namespaces in `config/lang.js`. Create a `.env` file with `HOST`, `PORT`, `BROWSER_API_URI`, `SERVER_API_URI`, `GOOGLE_ID` and `STATIC_SERVER` variables defined. Defining `STATIC_SERVER=true` will serve all files through the SSR express server, which is helpful during development. It's recommended to ommit this variable entirely from your production `.env` file and serve static files through something like [nginx](https://nginx.org/en/).

PM2 - `yarn pm2` will build the project and name it in pm2 according to the name you set at the top of your `package.json` file. You can also use `yarn pm2:restart` to build the project and restart the server, as well as `yarn pm2:stop` if you need to stop the server from running in the pm2 service.

Git - Simply use the `yarn git-up` or `npm run git-up` script to stop the server running in pm2, pull git updates, build the project, and start the server in pm2 again.

## Plop

Use the `yarn plop` command to access the plop menu. From here you can easily generate what would otherwise be tedious additions to your projects.

## Apollo Link State

Apollo Link State is included in lieu of Redux to have a more uniform method of requesting data throughout the site, whether it's local data or data from an API (GraphQL Server). The most complicated bit tends to be the setup. This is mitigated by the use of plop which will add a new store folder for you in `src/store`, generate individual files for queries, mutations and resolvers. The plop service also links it all up to the Apollo Provider so it's ready to be used.

Access to stores has been made easier with hooks from the [react-apollo-hooks](https://github.com/trojanowski/react-apollo-hooks) package. Look at the App or Auth stores for examples on how the basic query is set up. Then look at the hooks in `src/lib/hooks` for examples on how to make a custom hook to easily access the stores, queries, and mutations from any component.

If you don't want to use hooks for some reason, you can use each store's component wrapper. To use a store without hooks, wrap a component with its `with{{StoreName}}Store` (i.e. `withLangStore`) function, which is exported from each plop-generated store. Once wrapped, the component with receive the store as an object as well as all mutations and queries as props. You shouldn't need queries within components as you can access the store data via something like `this.props.lang.locale`. They are useful for use within resolvers or when removing then `@client` directive to get data from an API server in your components. Calling a mutation looks something like `this.props.changeLocaleMutation({ variables: { locale: "en_US" }})`. No need for a return as `this.props.lang.locale` will reflect the updated value, but returns are possible.

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

The `loginUser` mutation expects to send `{ username, password }` as its variables (both as strings) and return a `{ token, user }` object. Upon return the app will store the token as a cookie with the name set in `/src/config/app.js`. Modify this if it doesn't match your API schema.

On each page load, the app will check for a cookie and set a userId if present. This allows for first-load authentication to load (or not load) routes/components based on logged-in status. It's up to you to ensure your API handles security properly and issues a JWT token you trust.

I have created a [demo API server](https://github.com/RevNelson/api-playground) to use in conjunction with this project. You can view the source code to see how the client and server interact for auth and data exchange. Click [here](https://github.com/RevNelson/api-playground) to see the [API playground](https://github.com/RevNelson/api-playground).

## Styling

Styling is done through styled-components and transitions and effects are strictly CSS to keep bundle size down and to ensure movements are smooth. Tailwind CSS is used along with a babel plugin that allows for quick prototyping to get your site styled. With the babel plugin, the tailwind CSS is injected through styled-components' CSS prop feature. In this way, the quick tailwind CSS prototyping is performant enough to be used through production. However, for larger sites it may be more readable to convert the tailwind shorthand into proper styled-components markup.

In the `src/style/colors.js` file, you can define your own hex codes for colors that will affect styling throughout the site. Again, for production of larger projects, you may want to create your own color (and other design) properties through styled-components.

## Acknowledgments

Most of this is a mash up of these guides to get this specific combination of tools working.

- [Patrick Lee Scott](https://hackernoon.com/move-over-next-js-and-webpack-ba367f07545)
- [Manuel Bieh](https://github.com/manuelbieh/react-ssr-setup)
- [Patrick Cason](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e)
- [React Starter Kit](https://github.com/kriasoft/react-starter-kit)

Other resources used:

- [othree - i18ncsv2json](https://github.com/othree/i18ncsv2json)
- [Tailwind Toolbox](https://www.tailwindtoolbox.com/)

## Contributions

This has been made in a pretty opinionated way to suit my needs, but I think the concepts here can help others get their projects started. If you would like to see any particular areas fleshed out more, or more configurable, I would love feedback and would love contributions even more. I'd also love any feedback on the translations used or missed in the demo site. I've used a bits from [Microsoft's Language Portal](https://www.microsoft.com/en-us/language/), [Google Translate](https://translate.google.com/), and friends that speak the languages included, but I'm sure there are plenty of mistakes. Also, I would love for the features to be translated as well.
