import React from "react";
import { underlineAnimation } from "../../style/effects";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {
  const [t] = useTranslation(["common", "features"]);
  const liStyle = tw`mr-3 flex-1`;
  const aStyle = tw`block py-1 md:my-3 ml-1 align-middle no-underline text-near-black hover:text-fuschia pb-1 text-xs md:text-base md:inline-block`;
  return (
    <div
      css={tw`z-0 w-full md:mt-12 md:w-1/6 bg-white md:bg-white px-2 text-center fixed pin-b md:pt-8 md:pin-t md:pin-l h-auto pb-1 md:h-screen md:shadow md:border-near-black`}
    >
      <div css={tw`md:relative mx-auto`}>
        <ul
          css={tw`list-reset flex flex-row md:flex-col text-center md:text-left`}
        >
          <li css={liStyle}>
            <a href="#" css={aStyle} css={underlineAnimation}>
              {t("features:optimization")}
            </a>
          </li>
          <li css={liStyle}>
            <a href="#" css={aStyle} css={underlineAnimation}>
              {t("features:apollo")}
            </a>
          </li>
          <li css={liStyle}>
            <a href="#" css={aStyle} css={underlineAnimation}>
              {t("features:styling")}
            </a>
          </li>
          <li css={liStyle}>
            <a href="#" css={aStyle} css={underlineAnimation}>
              {t("features:languages")}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
