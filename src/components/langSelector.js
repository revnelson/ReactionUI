import React from "react";
import { useTranslation } from "react-i18next";
import Cookie from "js-cookie";
import { ReactComponent as FaLanguage } from "../icons/solid/language.svg";
import { Dropdown } from "./ui";
import { underlineAnimation } from "../style/effects";
import { langs } from "../../config/lang";

export const LangSelector = () => {
  const [t, i18n] = useTranslation();

  const iconStyle = tw`h-10 w-10 ml-2 mr-2 fill-current items-center flex cursor-pointer text-primary hover:text-fourth`;
  const iconOpenStyle = tw`text-fourth`;

  const liStyle = tw`mr-6 -ml-6 flex items-center hover:text-primary`;
  const liCurrent = tw`cursor-default text-primary`;
  const liNull = tw`cursor-pointer`;

  const flagStyle = tw`h-6 w-6 pr-2`;

  return (
    <Dropdown
      trigger={<FaLanguage css={tw`h-6 w-auto`} />}
      triggerStyle={iconStyle}
      triggerOpenStyle={iconOpenStyle}
    >
      <div css={tw`rounded bg-white text-near-black p-2 shadow`}>
        <ul css={`list-reset block`}>
          {Object.entries(langs).map(([key, lang], index) => {
            const Flag = lang.flag;
            return (
              <li
                css={`
                  ${liStyle} ${i18n.language === lang.code ? liCurrent : liNull}
                `}
                className="transition"
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  Cookie.set(`${process.env.SITE_NAME}-language`, lang.code);
                }}
                key={lang.code}
              >
                <div css={flagStyle}>
                  <Flag />
                </div>
                <div
                  css={i18n.language === lang.code ? "" : underlineAnimation}
                >
                  {lang.name}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Dropdown>
  );
};
