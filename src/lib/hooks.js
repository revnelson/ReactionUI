import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useApolloClient } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import { authQuery } from "../store/Auth/queries";
import { setUserMutation } from "../store/Auth/mutations";
import { logoutUserMutation } from "../api";

export const useClickOutside = callback => {
  const container = useRef(null);
  const [isTouchEvent, setTouchEvent] = useState(false);
  const eventType = isTouchEvent ? "touchend" : "click";

  function handleEvent(e) {
    if (e.type === 'click' && isTouchEvent) { return; } // prettier-ignore

    if (container.current && e.target !== null) {
      if (!container.current.contains(e.target)) {
        callback(e);
      }
    }
  }

  useEffect(() => {
    document.addEventListener(eventType, handleEvent, true);

    return () => {
      document.removeEventListener(eventType, handleEvent, true);
    };
  });

  useEffect(() => {
    setTouchEvent("ontouchstart" in document.documentElement);
  }, []);

  return container;
};

export const useAuth = () => {
  const setUserHook = useMutation(setUserMutation);
  const logoutUserHook = useMutation(logoutUserMutation);
  const client = useApolloClient();
  const {
    data: { auth }
  } = useQuery(authQuery);

  const setUser = user => {
    setUserHook({ variables: user });
  };

  const logoutUser = () => {
    logoutUserHook();
    client.resetStore();
    // TODO - Fix user sticking around after logout
    // process.env.BROWSER &&
    //   window.localStorage.removeItem(process.env.SITE_NAME);
  };

  const loggedIn = auth.id ? true : false;

  return { auth, setUser, logoutUser, loggedIn };
};
