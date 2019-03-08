import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookie from "js-cookie";
import { ReactComponent as FaLanguage } from "../icons/regular/language.svg";
import { ReactComponent as USAFlag } from "../icons/flags/4x3/us.svg";
import { ReactComponent as GermanyFlag } from "../icons/flags/4x3/de.svg";
import { ReactComponent as ChinaFlag } from "../icons/flags/4x3/cn.svg";
import { Dropdown } from "./ui";
import { underlineAnimation } from "../style/effects";

const LI = ({ children, lang }) => {
  const [t, i18n] = useTranslation();
  const liStyle = tw`mr-6 -ml-6 flex items-center hover:text-primary`;
  const liCurrent = tw`cursor-default text-primary`;
  const liNull = tw`cursor-pointer`;
  return (
    <li
      css={`
        ${liStyle} ${i18n.language === lang ? liCurrent : liNull}
      `}
      className="transition"
      onClick={() => {
        i18n.changeLanguage(lang);
        Cookie.set(`${process.env.SITE_NAME}-language`, lang);
      }}
    >
      {children}
    </li>
  );
};

const iconStyle = tw`h-10 w-10 ml-2 mr-2 fill-current items-center flex cursor-pointer text-primary hover:text-fourth`;
const iconOpenStyle = tw`text-fourth`;

const flagStyle = tw`h-6 w-6 pr-2`;

export const LangSelector = () => {
  const [t, i18n] = useTranslation();
  return (
    <Dropdown
      trigger={<FaLanguage css={tw`h-6 w-auto`} />}
      triggerStyle={iconStyle}
      triggerOpenStyle={iconOpenStyle}
    >
      <div css={tw`rounded bg-white text-near-black p-2 shadow`}>
        <ul css={`list-reset block`}>
          <LI lang="en">
            <USAFlag css={flagStyle} />
            <div css={i18n.language === "en" ? "" : underlineAnimation}>
              English
            </div>
          </LI>
          <LI lang="de">
            <GermanyFlag css={flagStyle} />
            <div css={i18n.language === "de" ? "" : underlineAnimation}>
              Deutsche
            </div>
          </LI>
          <LI lang="zh">
            <ChinaFlag css={flagStyle} />
            <div css={i18n.language === "zh" ? "" : underlineAnimation}>
              中文
            </div>
          </LI>
        </ul>
      </div>
    </Dropdown>
  );
};
