import React from "react";
import { Header } from "./header";
import { useApp } from "../../lib/hooks";
import { Sidebar } from "./sidebar";

export const AppLayout = ({ children }) => {
  const { app } = useApp();
  return (
    <React.Fragment>
      <Header />
      <div
        css={tw`main-content bg-near-white md:mt-2 pb-24 md:pb-5 w-full`}
        css={app.sidebar && tw`flex`}
      >
        {app.sidebar && <div css={tw`md:w-1/6`} />}
        <div css={app.sidebar && tw`w-full md:pl-3 md:w-5/6`}>
          <div css={tw`min-h-screen mt-16`}>{children}</div>
          <div css={tw`block text-center`}>
            ReactionUI © 2019 Created by Michael Nelson
          </div>{" "}
        </div>
        {app.sidebar && <Sidebar />}
      </div>
    </React.Fragment>
  );
};
