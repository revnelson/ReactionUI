import { appQuery } from "./queries";

export const sidebarToggle = (_, { state }, { cache }) => {
  const sidebar = state;

  const data = {
    app: {
      sidebar,
      __typename: "app"
    }
  };

  cache.writeData({ data });
  return null;
};

// export const openDrawerToggle = (_, none, { cache }) => {
//   const openDrawer = !cache.readQuery({ query: appOpenDrawerQuery }).app
//     .openDrawer;

//   const data = {
//     app: {
//       openDrawer,
//       __typename: "app"
//     }
//   };

//   cache.writeData({ data });
//   return null;
// };

// export const toggleAll = (_, { width, height }, { cache }) => {
//   const view = getView(width);
//   const collapsed = view !== "DesktopView";
//   const currentView = cache.readQuery({ query: appViewQuery }).app.view;
//   const currentHeight = cache.readQuery({ query: appHeightQuery }).app.height;
//   if (currentView !== view || height !== currentView) {
//     const height = height ? height : currentHeight;
//     const data = {
//       app: {
//         collapsed,
//         view,
//         height,
//         __typename: "app"
//       }
//     };

//     cache.writeData({ data });
//   }

//   return null;
// };

// export const openKeysChange = (_, { openKeys }, { cache }) => {
//   const data = {
//     app: {
//       openKeys,
//       __typename: "app"
//     }
//   };

//   cache.writeData({ data });
//   return null;
// };

// export const currentChange = (_, { current }, { cache }) => {
//   const data = {
//     app: {
//       current,
//       __typename: "app"
//     }
//   };

//   cache.writeData({ data });
//   return null;
// };
