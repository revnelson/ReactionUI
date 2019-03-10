import React from "react";
import { Header } from "./header";

export const AppLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div css={tw`main-content bg-near-white md:mt-2 pb-24 md:pb-5 w-full`}>
        <div css={tw`min-h-screen mt-16`}>{children}</div>
        <div css={tw`block text-center`}>
          ReactionUI © 2019 Created by Michael Nelson
        </div>
      </div>
    </React.Fragment>
  );
};
