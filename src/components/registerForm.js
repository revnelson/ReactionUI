import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { NameSelect } from "./forms/nameSelect";
import { useMutation } from "react-apollo-hooks";
import { registerUserMutation } from "../api";
import { langs } from "../../config";
import { useApp } from "../lib/hooks";

export const RegistrationForm = () => {
  const registerUserHook = useMutation(registerUserMutation);
  const { setAlert } = useApp();
  const [t, i18n] = useTranslation(["common", "auth"]);

  let nameSchema = {};

  Object.keys(langs).map(key => (nameSchema[key] = Yup.string()));

  const nameValidation = value => {
    let passed = false;
    value.map(v => {
      if (v.title) {
        console.log("VALIDATING NAMES: ", v.title);
        passed = true;
      }
    });
    return passed;
  };

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("auth:email-error"))
      .required(t("required")),
    password: Yup.string()
      .min(6, t("auth:too-short"))
      .max(30, t("auth:too-long"))
      .required(t("required")),
    names: Yup.array()
      .of(
        Yup.object().shape({
          ...nameSchema
        })
      )
      .test("at-least-one-name", t("auth:name-required"), nameValidation)
  });

  const handleSubmit = async (values, actions) => {
    let names = {};

    values.names.map(name => {
      name.title && (names[name.lang] = name.title);
    });

    const variables = {
      user: {
        username: values.email,
        password: values.password,
        name: names
      }
    };

    try {
      const {
        data: { registerUser }
      } = await registerUserHook({ variables });

      registerUser &&
        setAlert({
          title: t("auth:register-success"),
          message: t("please-login"),
          status: "success",
          redirect: "/login"
        });
    } catch (e) {
      console.log("REGISTRATION ERROR: ", e);

      setAlert({
        title: t("error"),
        message: e,
        status: "danger"
      });
    }
    actions.setSubmitting(false);
    return;
  };

  const labelStyle = tw`text-xs w-2/5 text-grey pr-4 self-center pb-4`;
  const fieldStyle = tw`bg-transparent border-b m-auto border-grey w-3/5 mb-6 text-grey-d1`;

  return (
    <div css={tw`flex flex-col shadow min-w-50 max-w-75 my-8`}>
      <div css={tw`w-full bg-grey-d2 rounded-tl rounded-tr text-white p-8`}>
        <h2 css={tw`uppercase`}>{t("register")}</h2>
      </div>
      <div css={tw`p-8 bg-white rounded-bl rounded-br h-auto w-full`}>
        <Formik
          initialValues={{ names: [{ lang: i18n.language, title: "" }] }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
          render={formProps => {
            return (
              <Form>
                <div css={tw`flex flex-row flex-no-wrap w-full`}>
                  <label id="email" css={labelStyle}>
                    {t("email")}
                  </label>
                  <Field name="email" type="text" css={fieldStyle} />
                </div>
                <ErrorMessage
                  css={tw`text-xs text-grey -mt-4 text-fuschia`}
                  name="email"
                  component="div"
                />
                <div css={tw`flex flex-row flex-no-wrap w-full`}>
                  <label id="password" css={labelStyle}>
                    {t("password")}
                  </label>
                  <Field
                    name="password"
                    autoComplete="new-password"
                    type="password"
                    css={fieldStyle}
                  />
                </div>{" "}
                <ErrorMessage
                  css={tw`text-xs text-grey -mt-4 text-fuschia`}
                  name="password"
                  component="div"
                />
                <label id="names" css={labelStyle} htmlFor="names-options">
                  {t("name")}:
                </label>
                <NameSelect values={formProps.values} fieldStyle={fieldStyle} />
                <ErrorMessage
                  css={tw`text-xs text-grey text-fuschia`}
                  name="names"
                  component="div"
                />
                <button
                  type="submit"
                  disabled={formProps.isSubmitting}
                  className="transition"
                  css={tw`shadow pt-3 mt-8 pb-3 w-full text-white bg-primary hover:bg-primary-l1 rounded-full`}
                >
                  {t("submit")}
                </button>
                <button
                  type="submit"
                  disabled={formProps.isSubmitting}
                  className="transition"
                  css={tw`shadow pt-3 mt-8 pb-3 w-full text-white bg-primary hover:bg-primary-l1 rounded-full`}
                >
                  {t("cancel")}
                </button>
              </Form>
            );
          }}
        />
      </div>
    </div>
  );
};
