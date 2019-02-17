import gql from "graphql-tag";
import { graphql } from "react-apollo";
import compose from "recompose/compose";
import { appConfig, layoutConfig, skin } from "../config";
/*
  Defaults // Initial State
*/

const style = appConfig.style;

const layout = layoutConfig[style];

const defaults = {
  app: {
    style,
    layout: {
      wide: layout.wide,
      pageLoader: layout.pageLoader,
      subHeader: layout.subHeader,
      headerFixed: layout.headerFixed,
      headerFixedMobile: layout.headerFixedMobile,
      searchExpandable: layout.searchExpandable,
      breadcrumbs: layout.breadcrumbs,
      leftAside: layout.leftAside,
      rightAside: layout.rightAside,
      submenuDropdown: layout.submenuDropdown,
      footer: layout.footer,
      quickSide: layout.quickSide,
      quickNav: layout.quickNav,
      scrollTop: layout.scrollTop,
      header: layout.header,
      __typename: "layout"
    },
    skin: {
      headerSubMenu: skin[style].headerSubMenu,
      headerSubMenuMobile: skin[style].headerSubMenuMobile,
      searchDropdown: skin[style].searchDropdown,
      __typename: "skin"
    },
    __typename: "app"
  }
};

/*
  GraphQL // Declare Types
*/

export const appQuery = gql`
  query getAppState {
    app @client {
      style
      layout {
        wide
        pageLoader
        headerFixed
        headerFixedMobile
        searchExpandable
        subHeader
        breadcrumbs
        leftAside
        rightAside
        submenuDropdown
        footer
        quickSide
        quickNav
        scrollTop
        header
      }
      skin {
        headerSubMenu
        headerSubMenuMobile
        searchDropdown
      }
    }
  }
`;

export const styleQuery = gql`
  query getAppStyle {
    app @client {
      style
    }
  }
`;

export const layoutQuery = gql`
  query getAppLayout {
    app @client {
      layout {
        wide
        pageLoader
        headerFixed
        headerFixedMobile
        searchExpandable
        subHeader
        breadcrumbs
        leftAside
        rightAside
        submenuDropdown
        footer
        quickSide
        quickNav
        scrollTop
        header
      }
    }
  }
`;

export const skinQuery = gql`
  query getAppSkin {
    app @client {
      skin {
        headerSubMenu
        headerSubMenuMobile
        searchDropdown
      }
    }
  }
`;

const appCollapsedQuery = gql`
  query getAppCollapsed {
    app @client {
      collapsed
    }
  }
`;

const appViewQuery = gql`
  query getAppView {
    app @client {
      view
    }
  }
`;

const appHeightQuery = gql`
  query getAppHeight {
    app @client {
      height
    }
  }
`;

const appOpenDrawerQuery = gql`
  query getAppOpenDrawer {
    app @client {
      openDrawer
    }
  }
`;

const collapsedToggleQuery = gql`
  mutation collapsedToggle {
    collapsedToggle @client
  }
`;

const openDrawerToggleQuery = gql`
  mutation openDrawerToggle {
    openDrawerToggle @client
  }
`;

const toggleAllQuery = gql`
  mutation toggleAll($width: Int, $height: Int) {
    toggleAll(width: $width, height: $height) @client
  }
`;

const openKeysChangeQuery = gql`
  mutation openKeysChange($openKeys: [String]) {
    openKeysChange(openKeys: $openKeys) @client
  }
`;

const currentChangeQuery = gql`
  mutation currentChange($current: [String]) {
    currentChange(current: $current) @client
  }
`;

/*
  Cache Mutations // Actions & Reducer
*/

const collapsedToggle = (_, none, { cache }) => {
  const collapsed = !cache.readQuery({ query: appCollapsedQuery }).app
    .collapsed;

  const data = {
    app: {
      collapsed,
      __typename: "app"
    }
  };

  cache.writeData({ data });
  return null;
};

const openDrawerToggle = (_, none, { cache }) => {
  const openDrawer = !cache.readQuery({ query: appOpenDrawerQuery }).app
    .openDrawer;

  const data = {
    app: {
      openDrawer,
      __typename: "app"
    }
  };

  cache.writeData({ data });
  return null;
};

const toggleAll = (_, { width, height }, { cache }) => {
  const view = getView(width);
  const collapsed = view !== "DesktopView";
  const currentView = cache.readQuery({ query: appViewQuery }).app.view;
  const currentHeight = cache.readQuery({ query: appHeightQuery }).app.height;
  if (currentView !== view || height !== currentView) {
    const height = height ? height : currentHeight;
    const data = {
      app: {
        collapsed,
        view,
        height,
        __typename: "app"
      }
    };

    cache.writeData({ data });
  }

  return null;
};

const openKeysChange = (_, { openKeys }, { cache }) => {
  const data = {
    app: {
      openKeys,
      __typename: "app"
    }
  };

  cache.writeData({ data });
  return null;
};

const currentChange = (_, { current }, { cache }) => {
  const data = {
    app: {
      current,
      __typename: "app"
    }
  };

  cache.writeData({ data });
  return null;
};

/*
  Store
*/

/**
 * The Store object used to construct
 * Apollo Link State's Client State
 */
const appStore = {
  defaults,
  mutations: {
    collapsedToggle,
    openDrawerToggle,
    toggleAll,
    openKeysChange,
    currentChange
  }
};

/*
  Helpers
*/

const appQueryHandler = {
  props: ({ ownProps, data: { app = {} } }) => ({
    ...ownProps,
    app
  })
};

const withAppStore = compose(
  graphql(appQuery, appQueryHandler),
  graphql(collapsedToggleQuery, { name: "collapsedToggleQuery" }),
  graphql(openDrawerToggleQuery, { name: "openDrawerToggleQuery" }),
  graphql(toggleAllQuery, { name: "toggleAllQuery" }),
  graphql(openKeysChangeQuery, { name: "openKeysChangeQuery" }),
  graphql(currentChangeQuery, { name: "currentChangeQuery" })
);

export { appStore, withAppStore };
