import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ReactComponent as Database } from "../../icons/solid/database.svg";
import { ReactComponent as Palette } from "../../icons/solid/palette.svg";
import { ReactComponent as FaLanguage } from "../../icons/solid/language.svg";
import { ReactComponent as Tools } from "../../icons/solid/tools.svg";
import { underlineAnimation } from "../../style/effects";
import { useTranslation } from "react-i18next";
import { useApp } from "../../lib/hooks";

export const Sidebar = () => {
  const { app } = useApp();
  const [t] = useTranslation("features");
  const liStyle = tw`mr-3 flex-1`;
  const iconStyle = tw`h-auto w-4 mr-2 fill-current`;
  const aStyle = tw`block py-1 md:my-3 ml-1 align-middle no-underline md:pr-1 text-near-black hover:text-fourth pb-1 text-xs md:text-base md:inline-block`;
  return (
    <TransitionGroup component={null}>
      {app.sidebar && (
        <CSSTransition classNames="slide-left" timeout={1000}>
          <div
            css={tw`z-0 w-full md:mt-12 md:w-1/6 bg-white md:bg-white px-2 text-center fixed pin-b md:pt-8 md:pin-t md:pin-l h-auto pb-1 md:h-screen md:shadow md:border-near-black`}
          >
            <div css={tw`md:relative mx-auto`}>
              <ul
                css={tw`list-reset flex flex-row md:flex-col text-center md:text-left`}
              >
                <li css={liStyle}>
                  <NavLink
                    to="/features#data"
                    smooth
                    css={aStyle}
                    className="transition"
                    css={underlineAnimation}
                  >
                    <Database css={iconStyle} />
                    {t("data")}
                  </NavLink>
                </li>
                <li css={liStyle}>
                  <NavLink
                    to="/features#styling"
                    smooth
                    css={aStyle}
                    className="transition"
                    css={underlineAnimation}
                  >
                    <Palette css={iconStyle} />
                    {t("styling")}
                  </NavLink>
                </li>
                <li css={liStyle}>
                  <NavLink
                    to="/features#languages"
                    smooth
                    css={aStyle}
                    className="transition"
                    css={underlineAnimation}
                  >
                    <FaLanguage css={iconStyle} />
                    {t("languages")}
                  </NavLink>
                </li>
                <li css={liStyle}>
                  <NavLink
                    to="/features#utilities"
                    smooth
                    css={aStyle}
                    className="transition"
                    css={underlineAnimation}
                  >
                    <Tools css={iconStyle} />
                    {t("utilities")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};
