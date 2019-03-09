import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as FaUser } from "../icons/solid/user.svg";
import { ReactComponent as FaLogin } from "../icons/solid/lock-open.svg";
import { ReactComponent as FaLogout } from "../icons/solid/lock.svg";
import { ReactComponent as FaRegister } from "../icons/solid/user-plus.svg";
import { Dropdown } from "./ui";
import { useTranslation } from "react-i18next";
import { underlineAnimation } from "../style/effects";

const LI = ({ icon, label, to }) => {
  const liStyle = tw`-ml-12 flex items-center hover:text-primary`;

  const rowStyle = tw`flex w-full`;

  const iconContainerStyle = tw`w-8 float-left`;

  const labelStyle = tw`float-right`;

  return (
    <li css={liStyle}>
      <NavLink
        to={to}
        css={tw`inline-block text-near-black no-underline hover:text-primary py-2 px-4`}
      >
        <div css={rowStyle}>
          <div css={iconContainerStyle}>{icon}</div>
          <div css={labelStyle} css={underlineAnimation}>
            {label}
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export const UserNav = () => {
  // const {
  //   data: { auth }
  // } = useQuery(authQuery);
  const [t] = useTranslation("common");

  const triggerStyle = tw`h-10 w-10 ml-2 mr-2 fill-current items-center flex cursor-pointer text-primary hover:text-fourth`;
  const triggerOpenStyle = tw`text-fourth`;

  const iconStyle = tw`h-4 w-auto fill-current cursor-pointer `;

  return (
    <Dropdown
      trigger={<FaUser css={tw`h-6 w-auto`} />}
      triggerStyle={triggerStyle}
      triggerOpenStyle={triggerOpenStyle}
    >
      <div css={tw`rounded bg-white text-near-black p-2 shadow`}>
        <ul css={`list-reset block`}>
          <LI
            icon={<FaLogin css={iconStyle} css={tw`text-primary`} />}
            label={t("login")}
            to="login"
          />
          <LI
            icon={<FaLogout css={iconStyle} css={tw`text-fourth`} />}
            label={t("logout")}
            to="login"
          />
          <LI
            icon={<FaRegister css={iconStyle} css={tw`text-green`} />}
            label={t("register")}
            to="register"
          />
        </ul>
      </div>
    </Dropdown>
  );
};
