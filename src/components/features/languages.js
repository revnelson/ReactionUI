import React from "react";
import { useTranslation } from "react-i18next";
import { FeatureCard } from "../ui";

export const Languages = ({ id = "languages" }) => {
  const [t] = useTranslation("features");
  return (
    <FeatureCard id={id} title={t("languages")}>
      <h4>i18Next</h4>
      Browser language detection. Client-side language is sent to server.
      Detected language is rendered server-side to prevent English flashing
      before client-side JS loads.
      <br />
      Translations are stored in local storage for quick access. Versioning is
      supported to force-update translations.
    </FeatureCard>
  );
};
