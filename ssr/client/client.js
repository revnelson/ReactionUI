import React from "react";
import { hydrate, render } from "react-dom";
// import deepForceUpdate from "react-deep-force-update";
import { rehydrateMarks } from "react-imported-component";
import importedComponents from "./imported";
import { ClientApp } from "./clientApp";

export const start = ({ document, module }) => {
  const element = document.getElementById("app");
  const app = <ClientApp />;

  // rehydrate the bundle marks from imported-components,
  // then rehydrate the react app
  rehydrateMarks().then(() => {
    if (!__DEV__) {
      // In production, we want to hydrate instead of render
      // because of the server-rendering
      hydrate(app, element);
    } else {
      render(app, element);
    }
  });

  // Enable Hot Module Reloading
  if (module.hot) {
    module.hot.accept();
  }
};

const options = {
  document: document,
  module: module
};

start(options);
