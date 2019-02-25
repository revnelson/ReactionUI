import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { withAuthStore } from "../store/Auth";

export const withPage = namespaces =>
  compose(
    withRouter,
    withNamespaces(namespaces),
    withAuthStore
  );
