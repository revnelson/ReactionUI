import React from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  appQuery,
  sidebarToggleMutation,
  setAlertMutation
} from "../../store/App";

export const useApp = () => {
  const {
    data: { app }
  } = useQuery(appQuery);

  const setAlertHook = useMutation(setAlertMutation);

  const setAlert = alert => {
    setAlertHook({ variables: { alert } });
  };

  const sidebarToggleHook = useMutation(sidebarToggleMutation);

  const sidebarToggle = (state = !app.sidebar) => {
    sidebarToggleHook({ variables: { state } });
  };

  return { app, setAlert, sidebarToggle };
};
