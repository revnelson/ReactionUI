import React from "react";
import { useTranslation } from "react-i18next";
import { FeatureCard } from "../ui";

export const Styling = ({ id = "styling" }) => {
  const [t] = useTranslation("features");
  return (
    <FeatureCard id={id} title={t("styling")}>
      <h4>Tailwind CSS</h4>
      <h4>Styled Components</h4>
      <h4>Pure CSS animations</h4>
    </FeatureCard>
  );
};
