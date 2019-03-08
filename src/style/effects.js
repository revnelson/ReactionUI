import { css, keyframes } from "styled-components";
import { primaryColor } from "./colors";

// Underline animation
export const underlineAnimation = css`
  position: relative;
  text-decoration: none;
  :hover {
  }
  :before {
    content: "";
    position: absolute;
    width: 90%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: ${primaryColor};
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.2s ease-in-out 0s;
  }
  :hover:before {
    visibility: visible;
    transform: scaleX(1);
  }
`;

const slideRightKeyframes = keyframes`
0% {
  transform: translateX(1000px) scaleY(1) scaleX(0.2);
  opacity: 0;
}
100% {
  transform: translateX(0) scaleY(1) scaleX(1);
  opacity: 1;
}
`;

export const slideRightAnimation = css`
  animation: ${slideRightKeyframes} 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
`;
