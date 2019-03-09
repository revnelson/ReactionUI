import React from "react";
import { ReactComponent as FaLanguage } from "../../icons/solid/language.svg";
import { ReactComponent as FaSearch } from "../../icons/solid/search.svg";
import { ReactComponent as FaRobot } from "../../icons/solid/robot.svg";
import { ReactComponent as FaSmiley } from "../../icons/regular/smile-beam.svg";
import { ReactComponent as FaSettings } from "../../icons/solid/cogs.svg";
import { LangSelector } from "../../components/langSelector";
import { UserNav } from "../../components/userNav";

const NavA = ({ children, to }) => (
  <a
    href={to}
    css={tw`inline-block text-near-black no-underline hover:text-primary py-2 px-4`}
  >
    {children}
  </a>
);

export const Header = () => {
  return (
    <nav
      css={tw`bg-white relative text-near-black pt-2 shadow md:pt-1 pb-1 px-1 mt-0 h-auto md:h-16 fixed w-full z-20 pin-t`}
    >
      <div css={tw`flex flex-wrap items-center`}>
        <div
          css={tw`flex flex-shrink md:w-1/3 justify-center md:justify-start`}
        >
          <a href="/" css={tw`hover:text-primary text-primary no-underline `}>
            <span css={tw`text-xl pl-2`}>{process.env.SITE_NAME}</span>
          </a>
        </div>

        <div
          css={tw`flex flex-1 md:w-1/3 text-white justify-center md:justify-start px-2`}
        >
          <span css={tw`relative w-full`}>
            <input
              type="search"
              placeholder="Search"
              css={tw`w-full bg-near-white text-sm text-near-black transition border border-transparent focus:outline-none focus:border-grey-l3 rounded py-1 px-2 pl-10 appearance-none leading-normal`}
            />
            <div
              css={tw`absolute search-icon`}
              style={{ top: ".5rem", left: ".8rem" }}
            >
              <FaSearch
                css={tw`fill-current pointer-events-none text-grey-l1 w-4 h-4 mb-2`}
              />
            </div>
          </span>
        </div>

        <div
          css={tw`flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end`}
        >
          <ul
            css={tw`list-reset flex justify-between flex-1 md:flex-none items-center`}
          >
            <li css={tw`flex-1 md:flex-none md:mr-3`}>
              <NavA to="about">About</NavA>
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
      </div>
    </nav>
  );
};
