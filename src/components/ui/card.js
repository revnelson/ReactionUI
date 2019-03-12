import React from "react";

export const Card = ({ children }) => {
  return (
    <div css={tw`rounded h-auto flex justify-center items-center`}>
      <div
        css={tw`rounded bg-white shadow h-auto w-auto p-6 flex flex-col justify-around`}
      >
        {children}
      </div>
    </div>
  );
};
