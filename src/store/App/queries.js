import gql from "graphql-tag";

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
