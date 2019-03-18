import React from "react";
import { FeatureCard } from "../ui";
import { useTranslation } from "react-i18next";

export const Utilities = ({ id = "utilities" }) => {
  const [t] = useTranslation("features");
  return (
    <FeatureCard id={id} title={t("utilities")}>
      <h4>Plop</h4>Easily create new local stores using the plop CLI.
      <h4>CSV to JSON</h4>
    </FeatureCard>
  );
};
