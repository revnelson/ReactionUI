import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as FaBars } from "../../icons/solid/bars.svg";
import { ReactComponent as FaLeftArrow } from "../../icons/solid/chevron-left.svg";
import { LangSelector } from "../../components/langSelector";
import { UserNav } from "../../components/userNav";
import { underlineAnimation } from "../../style/effects";
import { Search } from "../../components/search";
import { Alert } from "../../components/ui";
import { useApp } from "../../lib/hooks";

export const Header = () => {
  const { app, sidebarToggle } = useApp();
  const [t] = useTranslation("common");
  return (
    <nav
      css={tw`bg-white relative text-near-black shadow px-2 mt-0 h-auto md:h-auto py-2 flex justify-around items-center fixed w-full z-50 pin-t`}
    >
      <div css={tw`flex w-1/2 md:w-1/3 pl-2 md:pr-8  ml-4 items-center`}>
        <div
          css={tw`h-4 w-4 fill-current block mr-6 cursor-pointer hover:text-fourth`}
          css={app.sidebar ? tw`text-fourth` : tw`text-near-black`}
          className="transition"
          onClick={() => sidebarToggle()}
        >
          {app.sidebar ? <FaLeftArrow css={tw`h-4`} /> : <FaBars />}
        </div>
        <a href="/" css={tw`hover:text-primary text-primary no-underline `}>
          <span css={tw`text-2xl`}>{process.env.SITE_NAME}</span>
        </a>
      </div>

      <Search />

      <div
        css={tw`md:ml-4 w-full md:w-1/3 flex flex-1 justify-around md:justify-end`}
      >
        <ul css={tw`list-reset flex items-center`}>
          <li css={tw`flex-1 flex-none md:mr-3`}>
            <NavLink
              to="/features"
              css={tw`block text-near-black no-underline hover:text-primary py-2 px-4`}
              className="transition"
              activeStyle={tw`text-fourth focus:border-0`}
              css={underlineAnimation}
            >
              {t("features")}
            </NavLink>
          </li>
          <li css={tw`flex-1 md:flex-none md:mr-3`}>
            <div css={tw`inline-block`}>
              <LangSelector />
            </div>
          </li>
          <li css={tw`flex-1 md:flex-none md:mr-3`}>
            <div css={tw`inline-block`}>
              <UserNav />
            </div>
          </li>
        </ul>
      </div>
      <Alert />
    </nav>
  );
};
