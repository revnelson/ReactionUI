import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withAuthStore } from "../store/Auth";

export const withPage = namespaces =>
  compose(
    withRouter,
    withAuthStore
  );
