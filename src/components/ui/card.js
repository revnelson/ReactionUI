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

export const FeatureCard = ({ children, id, title }) => {
  return (
    <div css={tw`rounded h-auto shadow bg-white min-w-50 m-8 p-6`} id={id}>
      <h2 css={tw`pb-4`}>{title}</h2>
      {children}
    </div>
  );
};
