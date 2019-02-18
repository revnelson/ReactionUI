module.exports = function(plop) {
  plop.setGenerator("React Component", {
    description: "Create a new React component",
    prompts: [
      {
        type: "prompt",
        name: "componentName",
        message: "Name of your component:"
      }
    ],
    actions: () => {
      const actions = [
        {
          type: "add",
          path:
            "./src/shared/components/{{pascalCase componentName}}/{{pascalCase componentName}}.js",
          templateFile: "./config/plop/component/component.js.plop"
        }
      ];

      return actions;
    }
  });

  plop.setActionType("doTheThing", function(answers, config, plop) {
    // do something
    doSomething(config.configProp);
    // if something went wrong
    throw "error message";
    // otherwise
    return "success status message";
  });

  plop.setGenerator("Apollo Store", {
    description: "Generate a new Apollo local store",
    prompts: [
      {
        type: "prompt",
        name: "storeName",
        message: 'Name of your store (e.g. "Lang" or "Theme")'
      }
    ],
    actions: () => {
      const actions = [
        {
          type: "add",
          path: "./src/shared/store/{{pascalCase storeName}}/index.js",
          templateFile: "./config/plop/store/index.js.plop"
        },
        {
          type: "add",
          path: "./src/shared/store/{{pascalCase storeName}}/defaults.js",
          templateFile: "./config/plop/store/defaults.js.plop"
        },
        {
          type: "add",
          path: "./src/shared/store/{{pascalCase storeName}}/queries.js",
          templateFile: "./config/plop/store/queries.js.plop"
        },
        {
          type: "add",
          path: "./src/shared/store/{{pascalCase storeName}}/mutations.js",
          templateFile: "./config/plop/store/mutations.js.plop"
        },
        {
          type: "add",
          path: "./src/shared/store/{{pascalCase storeName}}/resolvers.js",
          templateFile: "./config/plop/store/resolvers.js.plop"
        },
        {
          type: "modify",
          path: "./src/shared/lib/apolloLinkState.js",
          pattern: /(import { withClientState } from "apollo-link-state";)/gi,
          template: `import { {{camelCase storeName}}Store } from "../store/{{pascalCase storeName}}";\r\nimport { withClientState } from "apollo-link-state";`
        },
        {
          type: "modify",
          path: "./src/shared/lib/apolloLinkState.js",
          pattern: /(];)/gi,
          template: ", {{camelCase storeName}}Store];"
        }
      ];

      return actions;
    }
  });
};
