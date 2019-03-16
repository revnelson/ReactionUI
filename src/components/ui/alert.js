import React from "react";
import { withRouter } from "react-router-dom";
import { ReactComponent as InfoIcon } from "../../icons/solid/info-circle.svg";
import { ReactComponent as DangerIcon } from "../../icons/solid/exclamation-circle.svg";
import { ReactComponent as SuccessIcon } from "../../icons/solid/check-circle.svg";
import { slideRightAnimation } from "../../style/effects";
import { useApp } from "../../lib/hooks";

export const Alert = withRouter(({ history }) => {
  const {
    app: { alert },
    setAlert
  } = useApp();

  if (alert.title) {
    const backgrounds = {
      info: tw`bg-blue`,
      danger: tw`bg-fuschia`,
      success: tw`bg-green`
    };
    const icons = {
      info: <InfoIcon />,
      danger: <DangerIcon />,
      success: <SuccessIcon />
    };
    const borders = {
      info: tw`border-blue-l1`,
      danger: tw`border-fuschia-l1`,
      success: tw`border-green-l1`
    };
    setTimeout(() => {
      setAlert();
      console.log("ALERT TIMEOUT: ", alert);
      alert.redirect && history.push(alert.redirect);
    }, alert.timeout);
    return (
      <div css={tw`flex h-auto absolute pin-r mr-2`} css={slideRightAnimation}>
        <div
          css={backgrounds[alert.status]}
          css={tw`w-16 text-center p-2 rounded-tl rounded-bl`}
        >
          <div css={tw`flex justify-center h-full items-center`}>
            {icons[alert.status]}
          </div>
        </div>
        <div
          css={tw`bg-white border-r-4 w-full p-4 rounded-tr rounded-br`}
          css={borders[alert.status]}
        >
          <div>
            <p css={tw`text-grey-dark font-bold`}>{alert.title}</p>
            <p css={tw`text-grey-dark`}>{alert.message}</p>
          </div>
        </div>
      </div>
    );
  }
  return "";
});
