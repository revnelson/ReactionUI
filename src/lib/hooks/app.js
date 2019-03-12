import React from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { appQuery, sidebarToggleMutation } from "../../store/App";

export const useApp = () => {
  const {
    data: { app }
  } = useQuery(appQuery);

  const sidebarToggleHook = useMutation(sidebarToggleMutation);

  const sidebarToggle = (state = !app.sidebar) => {
    sidebarToggleHook({ variables: { state } });
  };

  return { app, sidebarToggle };
};
