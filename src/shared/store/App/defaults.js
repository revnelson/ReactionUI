import { appConfig, layoutConfig, skin } from "../../config";

const style = appConfig.style;

const layout = layoutConfig[style];

export const defaults = {
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
