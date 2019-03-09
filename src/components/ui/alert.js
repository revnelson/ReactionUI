import React from "react";
import { ReactComponent as InfoIcon } from "../../icons/regular/info-circle.svg";
import { ReactComponent as DangerIcon } from "../../icons/regular/exclamation-circle.svg";
import { ReactComponent as SuccessIcon } from "../../icons/regular/check-circle.svg";

export const Alert = ({ message, status, title }) => {
  const backgrounds = {
    info: tw`bg-blue`,
    danger: tw`bg-fuschia`,
    success: tw`bg-lime`
  };
  const icons = {
    info: <InfoIcon />,
    danger: <DangerIcon />,
    success: <SuccessIcon />
  };
  const borders = {
    info: tw`border-blue-l1`,
    danger: tw`border-fuschia-l1`,
    success: tw`border-lime-l1`
  };
  return (
    <div css={tw`flex rounded h-auto absolute p-top -mt-24`}>
      <div
        css={backgrounds[status]}
        css={tw`w-16 text-center p-2 rounded-l-lg`}
      >
        <div css={tw`flex justify-center h-full items-center`}>
          {icons[status]}
        </div>
      </div>
      <div
        css={tw`bg-white border-r-4 w-full p-4 rounded-r`}
        css={borders[status]}
      >
        <div>
          <p css={tw`text-grey-dark font-bold`}>{title}</p>
          <p css={tw`text-grey-dark`}>{message}</p>
        </div>
      </div>
    </div>
  );
};