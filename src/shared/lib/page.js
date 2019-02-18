import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";

export default namespaces =>
  compose(
    withRouter,
    withNamespaces(namespaces)
  );
