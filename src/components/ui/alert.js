import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ReactComponent as InfoIcon } from "../../icons/solid/info-circle.svg";
import { ReactComponent as DangerIcon } from "../../icons/solid/exclamation-circle.svg";
import { ReactComponent as SuccessIcon } from "../../icons/solid/check-circle.svg";
import { ReactComponent as XIcon } from "../../icons/solid/times.svg";
import { slideRightAnimation, slideLeftAnimation } from "../../style/effects";
import { useApp } from "../../lib/hooks";

export const Alert = withRouter(({ history }) => {
  let animation = "";
  const {
    app: { alert },
    setAlert
  } = useApp();

  const backgrounds = {
    info: tw`bg-blue-l2`,
    danger: tw`bg-red-l1`,
    success: tw`bg-green-l1`
  };

  const icons = {
    info: <InfoIcon />,
    danger: <DangerIcon />,
    success: <SuccessIcon />
  };

  const borders = {
    info: tw`border-blue-l2`,
    danger: tw`border-red-l1`,
    success: tw`border-green-l1`
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      animation = slideLeftAnimation;
      setAlert();
      alert.redirect && history.push(alert.redirect);
    }, alert.timeout);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <TransitionGroup component={null}>
      {alert.title && (
        <CSSTransition classNames="slide" timeout={300}>
          <div
            css={tw`flex h-auto fixed pin-t pin-r mt-16 mx-2 max-w-full text-near-black`}
          >
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
              <div css={tw`relative pr-3`}>
                <p css={tw`text-grey-dark font-bold`}>{alert.title}</p>
                <p css={tw`text-grey-dark`}>{alert.message}</p>
                <div
                  css={tw`absolute pin-r pin-t h-2 w-2 -mt-3 cursor-pointer`}
                  onClick={setAlert}
                >
                  <XIcon />
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
});
