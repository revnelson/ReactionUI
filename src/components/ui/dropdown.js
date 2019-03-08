import React, { useEffect, useState } from "react";
import { css, keyframes } from "styled-components";
import { useClickOutside } from "../../lib/hooks";
import { slideRightAnimation } from "../../style/effects";

export const Dropdown = ({
  children,
  left,
  trigger,
  triggerOpenStyle,
  triggerStyle
}) => {
  const [cleared, setCleared] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropdownEl = useClickOutside(() => {
    setDropOpen(false), setCleared(true);
  });

  useEffect(() => {
    setCleared && !dropOpen && setCleared(false);
  });

  const containerStyle = tw`cursor-pointer rounded border-primary `;

  const dropStyle = tw`absolute mt-5 mr-2`;

  const alignRightStyle = tw`pin-r`;

  const alignLeftStyle = tw`pin-l`;
  return (
    <div
      onClick={() => {
        setDropOpen(!cleared);
        setCleared(false);
      }}
      css={containerStyle}
    >
      <div
        className="transition"
        css={`${triggerStyle}${dropOpen ? triggerOpenStyle : ""}`}
      >
        {trigger}
      </div>
      {dropOpen && (
        <div
          ref={dropdownEl}
          css={`${dropStyle}${left ? alignLeftStyle : alignRightStyle}`}
          css={slideRightAnimation}
        >
          {children}
        </div>
      )}
    </div>
  );
};
