import React from "react";
import { useTranslation } from "react-i18next";
import { FeatureCard } from "../ui";

export const Data = ({ id = "data" }) => {
  const [t] = useTranslation("features");
  return (
    <FeatureCard id={id} title={t("data")}>
      <h4>Apollo GraphQL</h4>
      <h4>Apollo Local State</h4>
      <h4>Formik Forms</h4>
      <h4>Yup Validation</h4>
    </FeatureCard>
  );
};
